#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..', '..');

const MANIFEST_PATH = path.join(
  repoRoot,
  'scripts',
  'sync',
  'official-guides-manifest.json',
);
const CONFIG_PATH = path.join(repoRoot, 'docs', '.vuepress', 'config.js');
const OUTLINE_PATH = path.join(repoRoot, 'OUTLINE.md');
const GUIDES_ROOT = path.join(repoRoot, 'docs', 'guides');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function walkMarkdownFiles(dirPath) {
  const results = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkMarkdownFiles(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(fullPath);
    }
  }
  return results;
}

function normalizeRoute(route) {
  if (!route) return '';
  let normalized = route.trim();
  normalized = normalized.replace(/\.html$/i, '');
  normalized = normalized.replace(/\/+$/, '');
  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`;
  }
  return normalized;
}

function localFileToRoute(filePath) {
  const relative = path.relative(GUIDES_ROOT, filePath).replace(/\\/g, '/');
  if (relative.toLowerCase().endsWith('/readme.md')) {
    const base = relative.slice(0, -'/README.md'.length);
    return normalizeRoute(`/guides/${base}`);
  }
  if (relative.toLowerCase().endsWith('/index.md')) {
    const base = relative.slice(0, -'/index.md'.length);
    return normalizeRoute(`/guides/${base}`);
  }
  return normalizeRoute(`/guides/${relative.replace(/\.md$/i, '')}`);
}

function routeToLocalCandidates(route) {
  const normalized = normalizeRoute(route);
  if (!normalized.startsWith('/guides/')) return [];
  const suffix = normalized.replace(/^\/guides\//, '');
  return [
    `./docs/guides/${suffix}.md`,
    `./docs/guides/${suffix}/README.md`,
    `./docs/guides/${suffix}/index.md`,
  ];
}

function routeExistsLocally(route, localRouteSet) {
  return localRouteSet.has(normalizeRoute(route));
}

function extractSidebarRoutes(configPath) {
  const text = fs.readFileSync(configPath, 'utf8');
  const lines = text.split(/\r?\n/);
  const routes = new Set();
  const routePattern = /path:\s*'([^']+)'/;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('//')) continue;
    const match = line.match(routePattern);
    if (!match) continue;
    const route = normalizeRoute(match[1]);
    if (route.startsWith('/guides/')) {
      routes.add(route);
    }
  }
  return routes;
}

function localPathToRoute(localPath) {
  const cleaned = localPath.trim();
  if (!cleaned || cleaned === '-' || cleaned === 'N/A') return '';
  if (!cleaned.startsWith('./docs/guides/')) return '';
  const relative = cleaned.replace('./docs/guides/', '');
  if (relative.endsWith('/README.md')) {
    return normalizeRoute(`/guides/${relative.slice(0, -'/README.md'.length)}`);
  }
  if (relative.endsWith('/index.md')) {
    return normalizeRoute(`/guides/${relative.slice(0, -'/index.md'.length)}`);
  }
  if (relative.endsWith('.md')) {
    return normalizeRoute(`/guides/${relative.slice(0, -'.md'.length)}`);
  }
  return '';
}

function parseOutlineTable(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split(/\r?\n/);
  const rows = [];
  let inTable = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('|')) {
      if (inTable) break;
      continue;
    }
    const cells = trimmed
      .split('|')
      .map((item) => item.trim())
      .filter(Boolean);

    if (cells.length < 3) continue;

    if (
      cells[0].includes('官方路径') &&
      cells[1].includes('本地路径') &&
      cells[2].includes('状态')
    ) {
      inTable = true;
      continue;
    }

    if (!inTable) continue;

    if (/^-{3,}$/.test(cells[0])) continue;

    rows.push({
      officialRoute: normalizeRoute(cells[0]),
      localPath: cells[1],
      status: cells[2],
    });
  }
  return rows;
}

function statusLabel(localExists) {
  return localExists ? 'DONE' : 'TODO';
}

function printSection(title, items) {
  console.log(`\n## ${title} (${items.length})`);
  for (const item of items) {
    console.log(`- ${item}`);
  }
}

function main() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error(`Manifest not found: ${MANIFEST_PATH}`);
    process.exit(2);
  }

  const manifest = readJson(MANIFEST_PATH);
  const officialRoutes = new Set(
    (manifest.officialRoutes || []).map((route) => normalizeRoute(route)),
  );
  const localFiles = walkMarkdownFiles(GUIDES_ROOT);
  const localRoutes = new Set(localFiles.map(localFileToRoute));
  const sidebarRoutes = extractSidebarRoutes(CONFIG_PATH);
  const outlineRows = parseOutlineTable(OUTLINE_PATH);
  const outlineOfficialRoutes = new Set(
    outlineRows
      .map((row) => row.officialRoute)
      .filter((route) => route.startsWith('/guides/')),
  );

  const officialMissingLocal = [...officialRoutes]
    .filter((route) => !routeExistsLocally(route, localRoutes))
    .sort();
  const localNotOfficial = [...localRoutes]
    .filter((route) => !officialRoutes.has(route))
    .sort();
  const sidebarMissingOfficial = [...sidebarRoutes]
    .filter((route) => !officialRoutes.has(route))
    .sort();
  const officialMissingSidebar = [...officialRoutes]
    .filter((route) => !sidebarRoutes.has(route))
    .sort();
  const outlineMissingOfficial = [...officialRoutes]
    .filter((route) => !outlineOfficialRoutes.has(route))
    .sort();
  const outlineUnknownOfficial = [...outlineOfficialRoutes]
    .filter((route) => !officialRoutes.has(route))
    .sort();

  const outlineStatusMismatch = [];
  const outlineLocalPathMismatch = [];

  for (const row of outlineRows) {
    if (!row.officialRoute.startsWith('/guides/')) continue;
    const actual = row.status.trim().toUpperCase();
    const localRoute = localPathToRoute(row.localPath);
    if (!localRoute) {
      if (actual === 'DONE') {
        outlineLocalPathMismatch.push(
          `${row.officialRoute} -> invalid local path "${row.localPath}"`,
        );
      }
      continue;
    }
    if (localRoute !== row.officialRoute) {
      outlineLocalPathMismatch.push(
        `${row.officialRoute} -> points to ${localRoute} (${row.localPath})`,
      );
    }

    const expected = statusLabel(routeExistsLocally(row.officialRoute, localRoutes));
    if (actual !== expected) {
      outlineStatusMismatch.push(
        `${row.officialRoute} -> status=${row.status}, expected=${expected}`,
      );
    }
  }

  console.log('Blockly guides sync check');
  console.log(`- Manifest: ${MANIFEST_PATH}`);
  console.log(`- Official routes: ${officialRoutes.size}`);
  console.log(`- Local guide routes: ${localRoutes.size}`);
  console.log(`- Sidebar guide routes: ${sidebarRoutes.size}`);
  console.log(`- Outline rows: ${outlineRows.length}`);

  printSection('官方有 / 本地无', officialMissingLocal);
  printSection('本地有 / 官方无', localNotOfficial);
  printSection('sidebar 中存在但不在官方清单', sidebarMissingOfficial);
  printSection('官方清单未被 sidebar 覆盖', officialMissingSidebar);
  printSection('OUTLINE 缺失官方路径', outlineMissingOfficial);
  printSection('OUTLINE 含未知官方路径', outlineUnknownOfficial);
  printSection('OUTLINE 状态不一致', outlineStatusMismatch);
  printSection('OUTLINE 本地路径映射异常', outlineLocalPathMismatch);

  const unresolved =
    officialMissingLocal.length +
    localNotOfficial.length +
    sidebarMissingOfficial.length +
    officialMissingSidebar.length +
    outlineMissingOfficial.length +
    outlineUnknownOfficial.length +
    outlineStatusMismatch.length +
    outlineLocalPathMismatch.length;

  console.log(`\nUnresolved items: ${unresolved}`);

  if (unresolved > 0) {
    process.exit(1);
  }
}

main();
