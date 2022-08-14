# Debugging with Blockly and blockly-samples

Sometimes when developing a plugin in blockly-samples, you'll need to make corresponding changes in Blockly itself. Most plugins are set up to fetch Blockly from the npm registry, so you'd only be able to use code that has already been released on npm. This would make debugging your Blockly changes difficult. When you want to make and test changes in both blockly and blockly- samples, you can use any of the below methods to use your unreleased changes together.

## Method 1: npm link

You can tell npm to use a package from your machine instead of fetching the package from the npm registry. Using this method, you should have access to sourcemaps that make debugging blockly_compressed easier. You can use this method with changes in core that haven't yet been pushed to GitHub.

1. In your fork of blockly:

```bash
$ npm run build
$ npm run package
$ cd dist
$ npm link
```

These steps build core Blockly, package it, then create a symlink to the packaged files.

2. In your fork of blockly-samples:

```bash
$ npm link blockly
```

This step tells npm to look for the symlink you created earlier instead of fetching the package from npm.

3. `npm run start` to test your plugin.

When you make changes in core, you'll have to rebuild and repackage it.

## Method 2: Fetch from GitHub

You can tell npm to fetch a package from GitHub instead of from the npm registry. Using this method, you should have access to sourcemaps that make debugging blockly_compressed easier. You'll have to use a version of blockly that is already published somewhere on GitHub.

1. Make sure that the `scripts` section in `package.json` for your plugin includes the following:

```json
"postinstall": "blockly-scripts postinstall"
```

This script will automatically build Blockly after it is installed from GitHub in a later step.

2. Instead of providing a version number for blockly in package.json, provide a git address and branch name:

```json
"blockly": "git://github.com/google/blockly.git#develop"
```

This can also be a link to your own fork of blockly if you have unmerged changes.

3. `npm install` like normal
4. `npm run start` to test your plugin

When you make changes in core Blockly, you'll have to push them to GitHub at the branch specified. In addition, when you want npm to fetch a new version from GitHub, you'll have to `npm uninstall` blockly (or otherwise remove it from your `node_modules`) and then reinstall it as described above.

## Method 3: Advanced Playground

You can use the advanced playground (in core Blockly) to debug your plugin. Using this method, you'll be using `blockly_uncompressed`, which may be easier to debug with as you won't be relying on sourcemaps. Use this method if you are having trouble debugging with sourcemaps or you want to test your plugin using the features of the advanced playground.

1. In your plugin directory in blockly-samples:

```bash
$ npm run build
$ cd dist
$ pwd
```

This builds and packages your plugin. Then it prints the full directory path of the dist directory for your plugin. Copy this path; we'll need it in the next step.

2. In blockly, in `advanced_playground.html`:

```html
<script src="$PATH_TO_DIST_DIR/index.js">
```

Then you also need to do any setup required for your plugin. For example, you may need to specify certain values in the options object. Do this setup in the existing workspace setup.

3. Open the advanced playground in the browser to test your plugin.

When you make changes in blockly, you only need to refresh. When you make changes to your plugin, you'll need to re-run `npm run build`.
