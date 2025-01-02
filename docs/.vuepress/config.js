module.exports = {
  title: 'Blockly 中文文档',
  description:
    'Blockly 中文文档站点，Blockly 二次开发文档, 包含如何使用及案例分享',
  head: [
    [
      'link',
      { rel: 'icon shortcut', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    [
      'link',
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#3eaf7c' },
    ],
    [
      'meta',
      { name: 'msapplication-TileImage', content: '/mstile-144x144.png' },
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    [
      'script',
      {
        async: true,
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3005478615102931',
        crossorigin: 'anonymous',
      },
    ],
    [
      'script',
      {
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-VPTYXZPKCQ',
      },
    ],
    [
      'script',
      {},
      [
        "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-VPTYXZPKCQ');",
      ],
    ],
  ],
  plugins: [
    'vuepress-plugin-element-tabs-less',
    ['vuepress-plugin-sitemap', { hostname: 'https://blockly.tortorse.com' }],
    // [
    //   '@vuepress/google-analytics',
    //   {
    //     ga: 'UA-210262342-1' // UA-00000000-0
    //   }
    // ]
  ],
  dest: 'public',
  themeConfig: {
    logo: '/logo.svg',
    repo: 'google/blockly',
    docsRepo: 'tortorse/blockly-document-chinese',
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '在 Github 上编辑此页',
    lastUpdated: '上次更新',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guides/overview' },
      {
        text: '参考',
        link: '/reference/overview',
      },
      {
        text: '样例',
        link: 'https://google.github.io/blockly-samples/',
      },
      {
        text: '获取帮助',
        link: 'https://groups.google.com/forum/#!forum/blockly',
      },
      {
        text: '峰会',
        link: 'https://developers.google.com/blockly/summits/summits',
      },
    ],
    sidebar: {
      '/guide': [
        {
          title: '开始',
          children: [
            {
              title: '什么是 Blockly？',
              path: '/guides/get-started/what-is-blockly',
            },
            {
              title: '为何选择 Blockly？',
              path: '/guides/get-started/why-blockly',
            },
            {
              title: '获取代码',
              path: '/guides/get-started/get-the-code',
            },
            {
              title: '可视化术语表',
              path: '/guides/get-started/workspace-anatomy',
            },
            {
              title: '基本步骤',
              children: [
                {
                  title: '工作区创建',
                  path: '',
                },
                {
                  title: '工具箱',
                  path: '/guides/configure/toolbox',
                },
                {
                  title: '块',
                  path: '/guides/get-started/blocks',
                },
              ],
            },
          ],
        },
        {
          title: '总览',
          path: '/guides/overview',
        },
        {
          title: '入门',
          path: '/guides/get-started',
        },
        {
          title: '配置 Blockly',
          children: [
            {
              title: '注入选项',
              children: [
                {
                  title: '配置结构',
                  path: '/guides/configure/configuration_struct',
                },
                {
                  title: '栅格',
                  path: '/guides/configure/grid',
                },
                {
                  title: '移动',
                  path: '/guides/configure/move',
                },
                {
                  title: '缩放',
                  path: '/guides/configure/zoom',
                },
              ],
            },
            {
              title: '固定尺寸的工作区',
              path: '/guides/configure/fixed-size',
            },
            {
              title: '可调整尺寸的工作区',
              path: '/guides/configure/resizable',
            },
            {
              title: '代码生成器',
              path: '/guides/configure/code-generators',
            },
            {
              title: '事件',
              path: '/guides/configure/events',
            },
            {
              title: '序列化',
              path: '/guides/configure/serialization',
            },
            {
              title: '云存储',
              path: '/guides/configure/cloud-storage',
            },
            {
              title: '主题',
              path: '/guides/configure/themes',
            },
            {
              title: '键盘导航',
              path: '/guides/configure/keyboard-nav',
            },
            {
              title: '翻译',
              path: '/guides/configure/translations',
            },
            {
              title: '上下文菜单',
              path: '/guides/configure/context-menus',
            },
            {
              title: '添加自定义块',
              path: '/guides/configure/custom-blocks',
            },
            {
              title: '高阶定制',
              children: [
                {
                  title: '使用 Blockly API',
                  path: '/guides/configure/advanced/using_blockly_apis',
                },
                {
                  title: '复刻',
                  path: '/guides/configure/advanced/forking_blockly',
                },
                {
                  title: '使用接口',
                  children: [
                    {
                      title: '总览',
                      path: '/guides/configure/advanced/interfaces/overview',
                    },
                    {
                      title: '连接检查器',
                      path: '/guides/configure/advanced/interfaces/connection_checker',
                    },
                    {
                      title: '度量管理器',
                      path: '/guides/configure/advanced/interfaces/metrics_manager',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: '创建自定义块',
          children: [
            {
              title: '总览',
              path: '/guides/create-custom-blocks/overview',
            },
            {
              title: 'Blockly 开发者工具',
              path: '/guides/create-custom-blocks/blockly-developer-tools',
            },
            {
              title: '定义块',
              path: '/guides/create-custom-blocks/define-blocks',
            },
            {
              title: '块颜色',
              path: '/guides/create-custom-blocks/block-colour',
            },
            {
              title: '本地化块',
              path: '/guides/create-custom-blocks/localize-blocks',
            },
            {
              title: '生成代码',
              path: '/guides/create-custom-blocks/generating-code',
            },
            {
              title: '块范式',
              path: '/guides/create-custom-blocks/block-paradigms',
            },
            {
              title: '样式指南',
              path: '/guides/create-custom-blocks/style-guide',
            },
            {
              title: '操作符优先级',
              path: '/guides/create-custom-blocks/operator-precedence',
            },
            {
              title: '缓存参数',
              path: '/guides/create-custom-blocks/caching-arguments',
            },
            {
              title: '类型检查',
              path: '/guides/create-custom-blocks/type-checks',
            },
            {
              title: '扩展和变形器',
              path: '/guides/create-custom-blocks/extensions',
            },
            {
              title: '变量',
              path: '/guides/create-custom-blocks/variables',
            },
            {
              title: '字段',
              children: [
                {
                  title: '总览',
                  path: '/guides/create-custom-blocks/fields/overview',
                },
                {
                  title: '字段解析',
                  path: '/guides/create-custom-blocks/fields/anatomy-of-a-field',
                },
                {
                  title: '校验器',
                  path: '/guides/create-custom-blocks/fields/validators',
                },
                {
                  title: '内置字段',
                  children: [
                    {
                      title: '总览',
                      path: '/guides/create-custom-blocks/fields/built-in-fields/overview',
                    },
                    {
                      title: '角度',
                      path: '/guides/create-custom-blocks/fields/built-in-fields/angle',
                    },
                    {
                      title: '复选框',
                      path: '/guides/create-custom-blocks/fields/built-in-fields/checkbox',
                    },
                    {
                      title: '颜色',
                      path: '/guides/create-custom-blocks/fields/built-in-fields/colour',
                    },
                    {
                      title: '日期',
                      path: '/guides/create-custom-blocks/fields/built-in-fields/date',
                    },
                    {
                      title: '下拉菜单',
                      path: '/guides/create-custom-blocks/fields/built-in-fields/dropdown',
                    },
                    {
                      title: '图片',
                      path: '/guides/create-custom-blocks/fields/built-in-fields/image',
                    },
                    {
                      title: '标签',
                      path: '/guides/create-custom-blocks/fields/built-in-fields/label',
                    },
                    {
                      title: '可序列化标签',
                      path: '/guides/create-custom-blocks/fields/built-in-fields/label-serializable',
                    },
                    {
                      title: '数字',
                      path: '/guides/create-custom-blocks/fields/built-in-fields/number',
                    },
                    {
                      title: '文本输入',
                      path: '/guides/create-custom-blocks/fields/built-in-fields/text-input',
                    },
                    {
                      title: '多行文本',
                      path: '/guides/create-custom-blocks/fields/built-in-fields/multiline-text-input',
                    },
                    {
                      title: '变量',
                      path: '/guides/create-custom-blocks/fields/built-in-fields/variable',
                    },
                  ],
                },
                {
                  title: '自定义字段',
                  children: [
                    {
                      title: '总览',
                      path: '/guides/create-custom-blocks/fields/customizing-fields/overview',
                    },
                    {
                      title: '创建自定义字段',
                      path: '/guides/create-custom-blocks/fields/customizing-fields/creating',
                    },
                    {
                      title: '扩展已有字段',
                      path: '/guides/create-custom-blocks/fields/customizing-fields/extending',
                    },
                    {
                      title: '升级自定义字段',
                      path: '/guides/create-custom-blocks/fields/customizing-fields/upgrading',
                    },
                  ],
                },
              ],
            },
            {
              title: '过程',
              children: [
                {
                  title: '总览',
                  path: '/guides/create-custom-blocks/procedures/overview',
                },
                {
                  title: '使用内置过程块',
                  path: '/guides/create-custom-blocks/procedures/using-procedures',
                },
                {
                  title: '创建自定义过程块',
                  path: '/guides/create-custom-blocks/procedures/creating-custom-procedure-blocks',
                },
                {
                  title: '创建自定义过程数据模型',
                  path: '/guides/create-custom-blocks/procedures/creating-custom-procedure-data-models',
                },
              ],
            },
          ],
        },
        {
          title: '应用集成',
          children: [
            {
              title: '最佳实践',
              path: '/guides/app-integration/best-practices',
            },
            {
              title: '生成并运行 JavaScript',
              path: '/guides/app-integration/running-javascript',
            },
            {
              title: '整体归因',
              path: '/guides/app-integration/attribution',
            },
          ],
        },
        {
          title: '共建 Blockly',
          children: [
            {
              title: '总览',
              path: '/guides/contribute/',
            },
            {
              title: '入门',
              children: [
                {
                  title: '总览',
                  path: '/guides/contribute/get-started/',
                },
                {
                  title: '开发工具',
                  path: '/guides/contribute/get-started/development_tools',
                },
                {
                  title: '提一个好 issue',
                  path: '/guides/contribute/get-started/write_a_good_issue',
                },

                {
                  title: '提一个好的合并请求',
                  path: '/guides/contribute/get-started/write_a_good_pr',
                },
                {
                  title: '提交信息',
                  path: '/guides/contribute/get-started/commits',
                },
                {
                  title: '代码评审过程',
                  path: '/guides/contribute/get-started/pr_review_process',
                },
                {
                  title: 'issue 标签',
                  path: '/guides/contribute/get-started/issue_labels',
                },
                {
                  title: '使用训练场',
                  path: '/guides/contribute/get-started/playground',
                },
              ],
            },
            {
              title: '为核心做贡献',
              children: [
                {
                  title: '总览',
                  path: '/guides/contribute/core/',
                },
                {
                  title: '风格指南',
                  path: '/guides/contribute/core/style_guide',
                },
                {
                  title: '构建',
                  path: '/guides/contribute/core/building',
                },
                {
                  title: '进阶编译',
                  path: '/guides/contribute/core/advanced',
                },
                {
                  title: '翻译',
                  children: [
                    {
                      title: '总览',
                      path: '/guides/contribute/core/translating',
                    },
                    {
                      title: '克林贡语',
                      path: '/guides/contribute/core/klingon',
                    },
                  ],
                },
                {
                  title: '单元测试',
                  path: '/guides/contribute/core/unit_testing',
                },
              ],
            },
            {
              title: '贡献样例',
              children: [
                {
                  title: '总览',
                  path: '/guides/contribute/samples/',
                },
                {
                  title: '代码仓库文件结构',
                  path: '/guides/contribute/samples/repository_structure',
                },
                {
                  title: '插件概述',
                  path: '/guides/contribute/samples/plugin_overview',
                },
                {
                  title: '添加插件',
                  path: '/guides/contribute/samples/add_a_plugin',
                },
                {
                  title: '命名规则',
                  path: '/guides/contribute/samples/naming',
                },
                {
                  title: '调试',
                  path: '/guides/contribute/samples/debugging',
                },
                {
                  title: '编写 Codelab',
                  path: '/guides/contribute/samples/write_a_codelab',
                },
              ],
            },
          ],
        },
      ],
      '/reference': [
        {
          title: '总览',
          path: '/reference/js/blockly',
        },
        {
          title: '类',
          collapsable: false,
          children: [
            {
              title: 'ASTNode',
              path: '/reference/js/blockly.astnode_class',
            },
            {
              title: 'BasicCursor',
              path: '/reference/js/blockly.basiccursor_class',
            },

            {
              title: 'Block',
              path: '/reference/js/blockly.block_class',
            },
            {
              title: 'BlockDragger',
              path: '/reference/js/blockly.blockdragger_class',
            },
            // {
            //   title: 'BlockDragSurfaceSvg',
            //   path: '/reference/js/blockly.blockdragsurfacesvg_class'
            // },
            // { title: 'BlockSvg', path: '/reference/js/blockly.blocksvg_class' },
            // { title: 'Bubble', path: '/reference/js/blockly.bubble_class' },
            // {
            //   title: 'BubbleDragger',
            //   path: '/reference/js/blockly.bubbledragger_class'
            // },
            // {
            //   title: 'CodeGenerator',
            //   path: '/reference/js/blockly.codegenerator_class'
            // },
            // {
            //   title: 'CollapsibleToolboxCategory',
            //   path: '/reference/js/blockly.collapsibletoolboxcategory_class'
            // },
            // { title: 'Comment', path: '/reference/js/blockly.comment_class' },
            // {
            //   title: 'ComponentManager',
            //   path: '/reference/js/blockly.componentmanager_class'
            // },
            // {
            //   title: 'Connection',
            //   path: '/reference/js/blockly.connection_class'
            // },
            // {
            //   title: 'ConnectionChecker',
            //   path: '/reference/js/blockly.connectionchecker_class'
            // },
            // {
            //   title: 'ConnectionDB',
            //   path: '/reference/js/blockly.connectiondb_class'
            // },
            // {
            //   title: 'ContextMenuRegistry',
            //   path: '/reference/js/blockly.contextmenuregistry_class'
            // },
            // { title: 'Cursor', path: '/reference/js/blockly.cursor_class' },
            // {
            //   title: 'DeleteArea',
            //   path: '/reference/js/blockly.deletearea_class'
            // },
            // {
            //   title: 'DragTarget',
            //   path: '/reference/js/blockly.dragtarget_class'
            // },
            // { title: 'Field', path: '/reference/js/blockly.field_class' },
            // {
            //   title: 'FieldAngle',
            //   path: '/reference/js/blockly.fieldangle_class'
            // },
            // {
            //   title: 'FieldCheckbox',
            //   path: '/reference/js/blockly.fieldcheckbox_class'
            // },
            // {
            //   title: 'FieldColour',
            //   path: '/reference/js/blockly.fieldcolour_class'
            // },
            // {
            //   title: 'FieldDropdown',
            //   path: '/reference/js/blockly.fielddropdown_class'
            // },
            // {
            //   title: 'FieldImage',
            //   path: '/reference/js/blockly.fieldimage_class'
            // },
            // {
            //   title: 'FieldLabel',
            //   path: '/reference/js/blockly.fieldlabel_class'
            // },
            // {
            //   title: 'FieldLabelSerializable',
            //   path: '/reference/js/blockly.fieldlabelserializable_class'
            // },
            // {
            //   title: 'FieldMultilineInput',
            //   path: '/reference/js/blockly.fieldmultilineinput_class'
            // },
            // {
            //   title: 'FieldNumber',
            //   path: '/reference/js/blockly.fieldnumber_class'
            // },
            // {
            //   title: 'FieldTextInput',
            //   path: '/reference/js/blockly.fieldtextinput_class'
            // },
            // {
            //   title: 'FieldVariable',
            //   path: '/reference/js/blockly.fieldvariable_class'
            // },
            // { title: 'Flyout', path: '/reference/js/blockly.flyout_class' },
            // {
            //   title: 'FlyoutButton',
            //   path: '/reference/js/blockly.flyoutbutton_class'
            // },
            // {
            //   title: 'FlyoutMetricsManager',
            //   path: '/reference/js/blockly.flyoutmetricsmanager_class'
            // },
            // { title: 'Gesture', path: '/reference/js/blockly.gesture_class' },
            // { title: 'Grid', path: '/reference/js/blockly.grid_class' },
            // {
            //   title: 'HorizontalFlyout',
            //   path: '/reference/js/blockly.horizontalflyout_class'
            // },
            // { title: 'Icon', path: '/reference/js/blockly.icon_class' },
            // { title: 'Input', path: '/reference/js/blockly.input_class' },
            // {
            //   title: 'InsertionMarkerManager',
            //   path: '/reference/js/blockly.insertionmarkermanager_class'
            // },
            // { title: 'Marker', path: '/reference/js/blockly.marker_class' },
            // {
            //   title: 'MarkerManager',
            //   path: '/reference/js/blockly.markermanager_class'
            // },
            // { title: 'Menu', path: '/reference/js/blockly.menu_class' },
            // { title: 'MenuItem', path: '/reference/js/blockly.menuitem_class' },
            // {
            //   title: 'MetricsManager',
            //   path: '/reference/js/blockly.metricsmanager_class'
            // },
            // { title: 'Mutator', path: '/reference/js/blockly.mutator_class' },
            // { title: 'Names', path: '/reference/js/blockly.names_class' },
            // { title: 'Options', path: '/reference/js/blockly.options_class' },
            // {
            //   title: 'RenderedConnection',
            //   path: '/reference/js/blockly.renderedconnection_class'
            // },
            // {
            //   title: 'Scrollbar',
            //   path: '/reference/js/blockly.scrollbar_class'
            // },
            // {
            //   title: 'ScrollbarPair',
            //   path: '/reference/js/blockly.scrollbarpair_class'
            // },
            // {
            //   title: 'ShortcutRegistry',
            //   path: '/reference/js/blockly.shortcutregistry_class'
            // },
            // {
            //   title: 'TabNavigateCursor',
            //   path: '/reference/js/blockly.tabnavigatecursor_class'
            // },
            // { title: 'Theme', path: '/reference/js/blockly.theme_class' },
            // {
            //   title: 'ThemeManager',
            //   path: '/reference/js/blockly.thememanager_class'
            // },
            // { title: 'Toolbox', path: '/reference/js/blockly.toolbox_class' },
            // {
            //   title: 'ToolboxCategory',
            //   path: '/reference/js/blockly.toolboxcategory_class'
            // },
            // {
            //   title: 'ToolboxItem',
            //   path: '/reference/js/blockly.toolboxitem_class'
            // },
            // {
            //   title: 'ToolboxSeparator',
            //   path: '/reference/js/blockly.toolboxseparator_class'
            // },
            // { title: 'Trashcan', path: '/reference/js/blockly.trashcan_class' },
            // {
            //   title: 'UnattachedFieldError',
            //   path: '/reference/js/blockly.unattachedfielderror_class'
            // },
            // {
            //   title: 'VariableMap',
            //   path: '/reference/js/blockly.variablemap_class'
            // },
            // {
            //   title: 'VariableModel',
            //   path: '/reference/js/blockly.variablemodel_class'
            // },
            // {
            //   title: 'VerticalFlyout',
            //   path: '/reference/js/blockly.verticalflyout_class'
            // },
            // { title: 'Warning', path: '/reference/js/blockly.warning_class' },
            // {
            //   title: 'Workspace',
            //   path: '/reference/js/blockly.workspace_class'
            // },
            // {
            //   title: 'WorkspaceAudio',
            //   path: '/reference/js/blockly.workspaceaudio_class'
            // },
            // {
            //   title: 'WorkspaceComment',
            //   path: '/reference/js/blockly.workspacecomment_class'
            // },
            // {
            //   title: 'WorkspaceCommentSvg',
            //   path: '/reference/js/blockly.workspacecommentsvg_class'
            // },
            // {
            //   title: 'WorkspaceDragger',
            //   path: '/reference/js/blockly.workspacedragger_class'
            // },
            // {
            //   title: 'WorkspaceDragSurfaceSvg',
            //   path: '/reference/js/blockly.workspacedragsurfacesvg_class'
            // },
            // {
            //   title: 'WorkspaceSvg',
            //   path: '/reference/js/blockly.workspacesvg_class'
            // },
            // {
            //   title: 'ZoomControls',
            //   path: '/reference/js/blockly.zoomcontrols_class'
            // }
          ],
        },
        // {
        //   title: 'Enumerations',
        //   collapsable: false,
        //   children: [
        //     {
        //       title: 'ConnectionType',
        //       path: '/reference/js/blockly.connectiontype_enum'
        //     },
        //     {
        //       title: 'inputTypes',
        //       path: '/reference/js/blockly.inputtypes_enum'
        //     }
        //   ]
        // },
        // {
        //   title: 'Functions',
        //   collapsable: false,
        //   children: [
        //     {
        //       title: 'bindEvent_(node, name, thisObject,func)',
        //       path: '/reference/js/blockly.bindevent__1_function'
        //     },
        //     {
        //       title:
        //         'bindEventWithChecks_(node, name,thisObject, func,opt_noCaptureIdentifier,_opt_noPreventDefault)',
        //       path: '/reference/js/blockly.bindeventwithchecks__1_function'
        //     },
        //     {
        //       title: 'copy(toCopy)',
        //       path: '/reference/js/blockly.copy_1_function'
        //     },
        //     {
        //       title: 'duplicate(toDuplicate)',
        //       path: '/reference/js/blockly.duplicate_1_function'
        //     },
        //     {
        //       title: 'hideChaff(opt_onlyClosePopups)',
        //       path: '/reference/js/blockly.hidechaff_1_function'
        //     },
        //     {
        //       title: 'hueToHex(hue)',
        //       path: '/reference/js/blockly.huetohex_1_function'
        //     },
        //     {
        //       title: 'inject(container, opt_options)',
        //       path: '/reference/js/blockly.inject_1_function'
        //     },
        //     {
        //       title: 'isNumber(str)',
        //       path: '/reference/js/blockly.isnumber_1_function'
        //     },
        //     {
        //       title: 'isVariableBackedParameterModel(param)',
        //       path:
        //         '/reference/js/blockly.isvariablebackedparametermodel_1_function'
        //     },
        //     {
        //       title: 'paste()',
        //       path: '/reference/js/blockly.paste_1_function'
        //     },
        //     {
        //       title: 'unbindEvent_(bindData)',
        //       path: '/reference/js/blockly.unbindevent__1_function'
        //     }
        //   ]
        // },
        // {
        //   title: 'Interfaces',
        //   collapsable: false,
        //   children: [
        //     {
        //       title: 'BlocklyOptions',
        //       path: '/reference/js/blockly.blocklyoptions_interface'
        //     },
        //     {
        //       title: 'FieldAngleConfig',
        //       path: '/reference/js/blockly.fieldangleconfig_interface'
        //     },
        //     {
        //       title: 'FieldAngleFromJsonConfig',
        //       path: '/reference/js/blockly.fieldanglefromjsonconfig_interface'
        //     },
        //     {
        //       title: 'FieldCheckboxConfig',
        //       path: '/reference/js/blockly.fieldcheckboxconfig_interface'
        //     },
        //     {
        //       title: 'FieldCheckboxFromJsonConfig',
        //       path:
        //         '/reference/js/blockly.fieldcheckboxfromjsonconfig_interface'
        //     },
        //     {
        //       title: 'FieldColourConfig',
        //       path: '/reference/js/blockly.fieldcolourconfig_interface'
        //     },
        //     {
        //       title: 'FieldColourFromJsonConfig',
        //       path: '/reference/js/blockly.fieldcolourfromjsonconfig_interface'
        //     },
        //     {
        //       title: 'FieldConfig',
        //       path: '/reference/js/blockly.fieldconfig_interface'
        //     },
        //     {
        //       title: 'FieldDropdownFromJsonConfig',
        //       path:
        //         '/reference/js/blockly.fielddropdownfromjsonconfig_interface'
        //     },
        //     {
        //       title: 'FieldImageConfig',
        //       path: '/reference/js/blockly.fieldimageconfig_interface'
        //     },
        //     {
        //       title: 'FieldImageFromJsonConfig',
        //       path: '/reference/js/blockly.fieldimagefromjsonconfig_interface'
        //     },
        //     {
        //       title: 'FieldLabelConfig',
        //       path: '/reference/js/blockly.fieldlabelconfig_interface'
        //     },
        //     {
        //       title: 'FieldLabelFromJsonConfig',
        //       path: '/reference/js/blockly.fieldlabelfromjsonconfig_interface'
        //     },
        //     {
        //       title: 'FieldMultilineInputConfig',
        //       path: '/reference/js/blockly.fieldmultilineinputconfig_interface'
        //     },
        //     {
        //       title: 'FieldMultilineInputFromJsonConfig',
        //       path:
        //         '/reference/js/blockly.fieldmultilineinputfromjsonconfig_interface'
        //     },
        //     {
        //       title: 'FieldNumberConfig',
        //       path: '/reference/js/blockly.fieldnumberconfig_interface'
        //     },
        //     {
        //       title: 'FieldNumberFromJsonConfig',
        //       path: '/reference/js/blockly.fieldnumberfromjsonconfig_interface'
        //     },
        //     {
        //       title: 'FieldTextInputFromJsonConfig',
        //       path:
        //         '/reference/js/blockly.fieldtextinputfromjsonconfig_interface'
        //     },
        //     {
        //       title: 'FieldVariableConfig',
        //       path: '/reference/js/blockly.fieldvariableconfig_interface'
        //     },
        //     {
        //       title: 'FieldVariableFromJsonConfig',
        //       path:
        //         '/reference/js/blockly.fieldvariablefromjsonconfig_interface'
        //     },
        //     {
        //       title: 'IASTNodeLocation',
        //       path: '/reference/js/blockly.iastnodelocation_interface'
        //     },
        //     {
        //       title: 'IASTNodeLocationSvg',
        //       path: '/reference/js/blockly.iastnodelocationsvg_interface'
        //     },
        //     {
        //       title: 'IASTNodeLocationWithBlock',
        //       path: '/reference/js/blockly.iastnodelocationwithblock_interface'
        //     },
        //     {
        //       title: 'IAutoHideable',
        //       path: '/reference/js/blockly.iautohideable_interface'
        //     },
        //     {
        //       title: 'IBlockDragger',
        //       path: '/reference/js/blockly.iblockdragger_interface'
        //     },
        //     {
        //       title: 'IBoundedElement',
        //       path: '/reference/js/blockly.iboundedelement_interface'
        //     },
        //     {
        //       title: 'IBubble',
        //       path: '/reference/js/blockly.ibubble_interface'
        //     },
        //     {
        //       title: 'ICollapsibleToolboxItem',
        //       path: '/reference/js/blockly.icollapsibletoolboxitem_interface'
        //     },
        //     {
        //       title: 'IComponent',
        //       path: '/reference/js/blockly.icomponent_interface'
        //     },
        //     {
        //       title: 'IConnectionChecker',
        //       path: '/reference/js/blockly.iconnectionchecker_interface'
        //     },
        //     {
        //       title: 'IContextMenu',
        //       path: '/reference/js/blockly.icontextmenu_interface'
        //     },
        //     {
        //       title: 'ICopyable',
        //       path: '/reference/js/blockly.icopyable_interface'
        //     },
        //     {
        //       title: 'IDeletable',
        //       path: '/reference/js/blockly.ideletable_interface'
        //     },
        //     {
        //       title: 'IDeleteArea',
        //       path: '/reference/js/blockly.ideletearea_interface'
        //     },
        //     {
        //       title: 'IDraggable',
        //       path: '/reference/js/blockly.idraggable_interface'
        //     },
        //     {
        //       title: 'IDragTarget',
        //       path: '/reference/js/blockly.idragtarget_interface'
        //     },
        //     {
        //       title: 'IFlyout',
        //       path: '/reference/js/blockly.iflyout_interface'
        //     },
        //     {
        //       title: 'IKeyboardAccessible',
        //       path: '/reference/js/blockly.ikeyboardaccessible_interface'
        //     },
        //     {
        //       title: 'IMetricsManager',
        //       path: '/reference/js/blockly.imetricsmanager_interface'
        //     },
        //     {
        //       title: 'IMovable',
        //       path: '/reference/js/blockly.imovable_interface'
        //     },
        //     {
        //       title: 'IPositionable',
        //       path: '/reference/js/blockly.ipositionable_interface'
        //     },
        //     {
        //       title: 'IRegistrable',
        //       path: '/reference/js/blockly.iregistrable_interface'
        //     },
        //     {
        //       title: 'ISelectable',
        //       path: '/reference/js/blockly.iselectable_interface'
        //     },
        //     {
        //       title: 'ISelectableToolboxItem',
        //       path: '/reference/js/blockly.iselectabletoolboxitem_interface'
        //     },
        //     {
        //       title: 'IStyleable',
        //       path: '/reference/js/blockly.istyleable_interface'
        //     },
        //     {
        //       title: 'IToolbox',
        //       path: '/reference/js/blockly.itoolbox_interface'
        //     },
        //     {
        //       title: 'IToolboxItem',
        //       path: '/reference/js/blockly.itoolboxitem_interface'
        //     },
        //     {
        //       title: 'IVariableBackedParameterModel',
        //       path:
        //         '/reference/js/blockly.ivariablebackedparametermodel_interface'
        //     }
        //   ]
        // },
        // {
        //   title: 'Namespaces',
        //   collapsable: false,
        //   children: [
        //     {
        //       title: 'ASTNode',
        //       path: '/reference/js/blockly.astnode_namespace'
        //     },
        //     { title: 'Block', path: '/reference/js/blockly.block_namespace' },
        //     {
        //       title: 'blockAnimations',
        //       path: '/reference/js/blockly.blockanimations_namespace'
        //     },
        //     {
        //       title: 'blockRendering',
        //       path: '/reference/js/blockly.blockrendering_namespace'
        //     },
        //     {
        //       title: 'browserEvents',
        //       path: '/reference/js/blockly.browserevents_namespace'
        //     },
        //     {
        //       title: 'bumpObjects',
        //       path: '/reference/js/blockly.bumpobjects_namespace'
        //     },
        //     {
        //       title: 'clipboard',
        //       path: '/reference/js/blockly.clipboard_namespace'
        //     },
        //     {
        //       title: 'CollapsibleToolboxCategory',
        //       path: '/reference/js/blockly.collapsibletoolboxcategory_namespace'
        //     },
        //     { title: 'common', path: '/reference/js/blockly.common_namespace' },
        //     {
        //       title: 'ComponentManager',
        //       path: '/reference/js/blockly.componentmanager_namespace'
        //     },
        //     {
        //       title: 'constants',
        //       path: '/reference/js/blockly.constants_namespace'
        //     },
        //     {
        //       title: 'ContextMenu',
        //       path: '/reference/js/blockly.contextmenu_namespace'
        //     },
        //     {
        //       title: 'ContextMenuItems',
        //       path: '/reference/js/blockly.contextmenuitems_namespace'
        //     },
        //     {
        //       title: 'ContextMenuRegistry',
        //       path: '/reference/js/blockly.contextmenuregistry_namespace'
        //     },
        //     { title: 'Css', path: '/reference/js/blockly.css_namespace' },
        //     { title: 'dialog', path: '/reference/js/blockly.dialog_namespace' },
        //     { title: 'Events', path: '/reference/js/blockly.events_namespace' },
        //     {
        //       title: 'Extensions',
        //       path: '/reference/js/blockly.extensions_namespace'
        //     },
        //     {
        //       title: 'fieldRegistry',
        //       path: '/reference/js/blockly.fieldregistry_namespace'
        //     },
        //     { title: 'geras', path: '/reference/js/blockly.geras_namespace' },
        //     {
        //       title: 'ICopyable',
        //       path: '/reference/js/blockly.icopyable_namespace'
        //     },
        //     { title: 'Input', path: '/reference/js/blockly.input_namespace' },
        //     {
        //       title: 'InsertionMarkerManager',
        //       path: '/reference/js/blockly.insertionmarkermanager_namespace'
        //     },
        //     {
        //       title: 'libraryBlocks',
        //       path: '/reference/js/blockly.libraryblocks_namespace'
        //     },
        //     {
        //       title: 'MetricsManager',
        //       path: '/reference/js/blockly.metricsmanager_namespace'
        //     },
        //     {
        //       title: 'minimalist',
        //       path: '/reference/js/blockly.minimalist_namespace'
        //     },
        //     { title: 'Names', path: '/reference/js/blockly.names_namespace' },
        //     {
        //       title: 'Options',
        //       path: '/reference/js/blockly.options_namespace'
        //     },
        //     {
        //       title: 'Procedures',
        //       path: '/reference/js/blockly.procedures_namespace'
        //     },
        //     {
        //       title: 'registry',
        //       path: '/reference/js/blockly.registry_namespace'
        //     },
        //     {
        //       title: 'RenderedConnection',
        //       path: '/reference/js/blockly.renderedconnection_namespace'
        //     },
        //     {
        //       title: 'serialization',
        //       path: '/reference/js/blockly.serialization_namespace'
        //     },
        //     {
        //       title: 'ShortcutItems',
        //       path: '/reference/js/blockly.shortcutitems_namespace'
        //     },
        //     {
        //       title: 'ShortcutRegistry',
        //       path: '/reference/js/blockly.shortcutregistry_namespace'
        //     },
        //     { title: 'Theme', path: '/reference/js/blockly.theme_namespace' },
        //     {
        //       title: 'ThemeManager',
        //       path: '/reference/js/blockly.thememanager_namespace'
        //     },
        //     { title: 'Themes', path: '/reference/js/blockly.themes_namespace' },
        //     {
        //       title: 'thrasos',
        //       path: '/reference/js/blockly.thrasos_namespace'
        //     },
        //     {
        //       title: 'ToolboxCategory',
        //       path: '/reference/js/blockly.toolboxcategory_namespace'
        //     },
        //     {
        //       title: 'ToolboxSeparator',
        //       path: '/reference/js/blockly.toolboxseparator_namespace'
        //     },
        //     {
        //       title: 'Tooltip',
        //       path: '/reference/js/blockly.tooltip_namespace'
        //     },
        //     { title: 'Touch', path: '/reference/js/blockly.touch_namespace' },
        //     {
        //       title: 'uiPosition',
        //       path: '/reference/js/blockly.uiposition_namespace'
        //     },
        //     { title: 'utils', path: '/reference/js/blockly.utils_namespace' },
        //     {
        //       title: 'Variables',
        //       path: '/reference/js/blockly.variables_namespace'
        //     },
        //     {
        //       title: 'VariablesDynamic',
        //       path: '/reference/js/blockly.variablesdynamic_namespace'
        //     },
        //     {
        //       title: 'WidgetDiv',
        //       path: '/reference/js/blockly.widgetdiv_namespace'
        //     },
        //     { title: 'Xml', path: '/reference/js/blockly.xml_namespace' },
        //     { title: 'zelos', path: '/reference/js/blockly.zelos_namespace' }
        //   ]
        // },
        // {
        //   title: 'Variables',
        //   collapsable: false,
        //   children: [
        //     {
        //       title: 'ALIGN_CENTRE',
        //       path: '/reference/js/blockly.align_centre_variable'
        //     },
        //     {
        //       title: 'ALIGN_LEFT',
        //       path: '/reference/js/blockly.align_left_variable'
        //     },
        //     {
        //       title: 'ALIGN_RIGHT',
        //       path: '/reference/js/blockly.align_right_variable'
        //     },
        //     { title: 'Blocks', path: '/reference/js/blockly.blocks_variable' },
        //     {
        //       title: 'COLLAPSE_CHARS',
        //       path: '/reference/js/blockly.collapse_chars_variable'
        //     },
        //     {
        //       title: 'COLLAPSED_FIELD_NAME',
        //       path: '/reference/js/blockly.collapsed_field_name_variable'
        //     },
        //     {
        //       title: 'COLLAPSED_INPUT_NAME',
        //       path: '/reference/js/blockly.collapsed_input_name_variable'
        //     },
        //     { title: 'config', path: '/reference/js/blockly.config_variable' },
        //     {
        //       title: 'connectionTypes',
        //       path: '/reference/js/blockly.connectiontypes_variable'
        //     },
        //     {
        //       title: 'defineBlocksWithJsonArray',
        //       path: '/reference/js/blockly.defineblockswithjsonarray_variable'
        //     },
        //     {
        //       title: 'DELETE_VARIABLE_ID',
        //       path: '/reference/js/blockly.delete_variable_id_variable'
        //     },
        //     {
        //       title: 'DRAG_STACK',
        //       path: '/reference/js/blockly.drag_stack_variable'
        //     },
        //     {
        //       title: 'DropDownDiv',
        //       path: '/reference/js/blockly.dropdowndiv_variable'
        //     },
        //     {
        //       title: 'DUMMY_INPUT',
        //       path: '/reference/js/blockly.dummy_input_variable'
        //     },
        //     {
        //       title: 'getMainWorkspace',
        //       path: '/reference/js/blockly.getmainworkspace_variable'
        //     },
        //     {
        //       title: 'getSelected',
        //       path: '/reference/js/blockly.getselected_variable'
        //     },
        //     {
        //       title: 'INPUT_VALUE',
        //       path: '/reference/js/blockly.input_value_variable'
        //     },
        //     {
        //       title: 'JavaScript',
        //       path: '/reference/js/blockly.javascript_variable'
        //     },
        //     { title: 'Msg', path: '/reference/js/blockly.msg_variable' },
        //     {
        //       title: 'NEXT_STATEMENT',
        //       path: '/reference/js/blockly.next_statement_variable'
        //     },
        //     {
        //       title: 'OPPOSITE_TYPE',
        //       path: '/reference/js/blockly.opposite_type_variable'
        //     },
        //     {
        //       title: 'OUTPUT_VALUE',
        //       path: '/reference/js/blockly.output_value_variable'
        //     },
        //     {
        //       title: 'PREVIOUS_STATEMENT',
        //       path: '/reference/js/blockly.previous_statement_variable'
        //     },
        //     {
        //       title: 'PROCEDURE_CATEGORY_NAME',
        //       path: '/reference/js/blockly.procedure_category_name_variable'
        //     },
        //     {
        //       title: 'RENAME_VARIABLE_ID',
        //       path: '/reference/js/blockly.rename_variable_id_variable'
        //     },
        //     {
        //       title: 'resizeSvgContents',
        //       path: '/reference/js/blockly.resizesvgcontents_variable'
        //     },
        //     {
        //       title: 'setLocale',
        //       path: '/reference/js/blockly.setlocale_variable'
        //     },
        //     {
        //       title: 'setParentContainer',
        //       path: '/reference/js/blockly.setparentcontainer_variable'
        //     },
        //     {
        //       title: 'svgResize',
        //       path: '/reference/js/blockly.svgresize_variable'
        //     },
        //     {
        //       title: 'TOOLBOX_AT_BOTTOM',
        //       path: '/reference/js/blockly.toolbox_at_bottom_variable'
        //     },
        //     {
        //       title: 'TOOLBOX_AT_LEFT',
        //       path: '/reference/js/blockly.toolbox_at_left_variable'
        //     },
        //     {
        //       title: 'TOOLBOX_AT_RIGHT',
        //       path: '/reference/js/blockly.toolbox_at_right_variable'
        //     },
        //     {
        //       title: 'TOOLBOX_AT_TOP',
        //       path: '/reference/js/blockly.toolbox_at_top_variable'
        //     },
        //     {
        //       title: 'VARIABLE_CATEGORY_NAME',
        //       path: '/reference/js/blockly.variable_category_name_variable'
        //     },
        //     {
        //       title: 'VARIABLE_DYNAMIC_CATEGORY_NAME',
        //       path:
        //         '/reference/js/blockly.variable_dynamic_category_name_variable'
        //     },
        //     { title: 'VERSION', path: '/reference/js/blockly.version_variable' }
        //   ]
        // },
        // {
        //   title: 'Type Aliases',
        //   collapsable: false,
        //   children: [
        //     {
        //       title: 'FieldAngleValidator',
        //       path: '/reference/js/blockly.fieldanglevalidator_typealias'
        //     },
        //     {
        //       title: 'FieldCheckboxValidator',
        //       path: '/reference/js/blockly.fieldcheckboxvalidator_typealias'
        //     },
        //     {
        //       title: 'FieldColourValidator',
        //       path: '/reference/js/blockly.fieldcolourvalidator_typealias'
        //     },
        //     {
        //       title: 'FieldDropdownConfig',
        //       path: '/reference/js/blockly.fielddropdownconfig_typealias'
        //     },
        //     {
        //       title: 'FieldDropdownValidator',
        //       path: '/reference/js/blockly.fielddropdownvalidator_typealias'
        //     },
        //     {
        //       title: 'FieldMultilineInputValidator',
        //       path:
        //         '/reference/js/blockly.fieldmultilineinputvalidator_typealias'
        //     },
        //     {
        //       title: 'FieldNumberValidator',
        //       path: '/reference/js/blockly.fieldnumbervalidator_typealias'
        //     },
        //     {
        //       title: 'FieldTextInputConfig',
        //       path: '/reference/js/blockly.fieldtextinputconfig_typealias'
        //     },
        //     {
        //       title: 'FieldTextInputValidator',
        //       path: '/reference/js/blockly.fieldtextinputvalidator_typealias'
        //     },
        //     {
        //       title: 'FieldValidator',
        //       path: '/reference/js/blockly.fieldvalidator_typealias'
        //     },
        //     {
        //       title: 'FieldVariableValidator',
        //       path: '/reference/js/blockly.fieldvariablevalidator_typealias'
        //     },
        //     {
        //       title: 'MenuGenerator',
        //       path: '/reference/js/blockly.menugenerator_typealias'
        //     },
        //     {
        //       title: 'MenuGeneratorFunction',
        //       path: '/reference/js/blockly.menugeneratorfunction_typealias'
        //     },
        //     {
        //       title: 'MenuOption',
        //       path: '/reference/js/blockly.menuoption_typealias'
        //     }
        //   ]
        // },
        // {
        //   title: 'Enumerations',
        //   collapsable: false,
        //   children: [
        //     {
        //       title: 'ConnectionType',
        //       path: '/reference/js/blockly.connectiontype_enum'
        //     },
        //     {
        //       title: 'inputTypes',
        //       path: '/reference/js/blockly.inputtypes_enum'
        //     }
        //   ]
        // }
      ],
    },
  },
};
