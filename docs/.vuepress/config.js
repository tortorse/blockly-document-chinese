module.exports = {
  title: 'Blockly 中文文档',
  description:
    'Blockly 中文文档站点，Blockly 二次开发文档, 包含如何使用及案例分享',
  head: [
    [
      'link',
      { rel: 'icon shortcut', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
    ],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    [
      'link',
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#3eaf7c' }
    ],
    [
      'meta',
      { name: 'msapplication-TileImage', content: '/mstile-144x144.png' }
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  plugins: [
    'vuepress-plugin-element-tabs-less',
    ['vuepress-plugin-sitemap', { hostname: 'https://blockly.tortorse.com' }],
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-210262342-1' // UA-00000000-0
      }
    ],
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: true
      }
    ]
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
        link: 'https://developers.google.com/blockly/reference/overview'
      },
      {
        text: '样例',
        link: 'https://google.github.io/blockly-samples/'
      },
      {
        text: '获取帮助',
        link: 'https://groups.google.com/forum/#!forum/blockly'
      },
      {
        text: '主题演讲',
        link: 'https://developers.google.com/blockly/summits/summits'
      }
    ],
    sidebar: {
      '/guide': [
        {
          title: ' 总览',
          path: '/guides/overview'
        },
        {
          title: '入门',
          path: '/guides/get-started'
        },
        {
          title: '配置 Blockly',
          children: [
            {
              title: '注入选项',
              children: [
                {
                  title: '配置结构',
                  path: '/guides/configure/configuration_struct'
                },
                {
                  title: '栅格',
                  path: '/guides/configure/grid'
                },
                {
                  title: '移动',
                  path: '/guides/configure/move'
                },
                {
                  title: '缩放',
                  path: '/guides/configure/zoom'
                }
              ]
            },
            {
              title: '固定尺寸的工作区',
              path: '/guides/configure/fixed-size'
            },
            {
              title: '可调整尺寸的工作区',
              path: '/guides/configure/resizable'
            },
            {
              title: '工具箱',
              path: '/guides/configure/toolbox'
            },
            {
              title: '代码生成器',
              path: '/guides/configure/code-generators'
            },
            {
              title: '事件',
              path: '/guides/configure/events'
            },
            {
              title: '序列化',
              path: '/guides/configure/serialization'
            },
            {
              title: '云存储',
              path: '/guides/configure/cloud-storage'
            },
            {
              title: '主题',
              path: '/guides/configure/themes'
            },
            {
              title: '键盘导航',
              path: '/guides/configure/keyboard-nav'
            },
            {
              title: '翻译',
              path: '/guides/configure/translations'
            },
            {
              title: '上下文菜单',
              path: '/guides/configure/context-menus'
            },
            {
              title: '添加自定义块',
              path: '/guides/configure/custom-blocks'
            }
          ]
        },
        {
          title: '创建自定义块',
          children: [
            {
              title: '总览',
              path: '/guides/create-custom-blocks/overview'
            },
            {
              title: 'Blockly 开发者工具',
              path: '/guides/create-custom-blocks/blockly-developer-tools'
            },
            {
              title: '定义块',
              path: '/guides/create-custom-blocks/define-blocks'
            },
            {
              title: '块颜色',
              path: '/guides/create-custom-blocks/block-colour'
            },
            {
              title: '本地化块',
              path: '/guides/create-custom-blocks/localize-blocks'
            },
            {
              title: '生成代码',
              path: '/guides/create-custom-blocks/generating-code'
            },
            {
              title: '块范例',
              path: '/guides/create-custom-blocks/block-paradigms'
            },
            {
              title: '样式指南',
              path: '/guides/create-custom-blocks/style-guide'
            },
            {
              title: '操作符优先级',
              path: '/guides/create-custom-blocks/operator-precedence'
            },
            {
              title: '缓存参数',
              path: '/guides/create-custom-blocks/caching-arguments'
            },
            {
              title: '类型检查',
              path: '/guides/create-custom-blocks/type-checks'
            },
            {
              title: '扩展和变形器',
              path: '/guides/create-custom-blocks/extensions'
            },
            {
              title: '变量',
              path: '/guides/create-custom-blocks/variables'
            },
            {
              title: '字段',
              children: [
                {
                  title: '总览',
                  path: '/guides/create-custom-blocks/fields/overview'
                },
                {
                  title: '字段解析',
                  path: '/guides/create-custom-blocks/fields/anatomy-of-a-field'
                },
                {
                  title: '校验器',
                  path: '/guides/create-custom-blocks/fields/validators'
                },
                {
                  title: '内置字段',
                  children: [
                    {
                      title: '总览',
                      path:
                        '/guides/create-custom-blocks/fields/built-in-fields/overview'
                    },
                    {
                      title: '角',
                      path:
                        '/guides/create-custom-blocks/fields/built-in-fields/angle'
                    },
                    {
                      title: '复选框',
                      path:
                        '/guides/create-custom-blocks/fields/built-in-fields/checkbox'
                    },
                    {
                      title: '颜色',
                      path:
                        '/guides/create-custom-blocks/fields/built-in-fields/colour'
                    },
                    {
                      title: '日期',
                      path:
                        '/guides/create-custom-blocks/fields/built-in-fields/date'
                    },
                    {
                      title: '下拉菜单',
                      path:
                        '/guides/create-custom-blocks/fields/built-in-fields/dropdown'
                    },
                    {
                      title: '图片',
                      path:
                        '/guides/create-custom-blocks/fields/built-in-fields/image'
                    },
                    {
                      title: '标签',
                      path:
                        '/guides/create-custom-blocks/fields/built-in-fields/label'
                    },
                    {
                      title: '可序列化标签',
                      path:
                        '/guides/create-custom-blocks/fields/built-in-fields/label-serializable'
                    },
                    {
                      title: '数字',
                      path:
                        '/guides/create-custom-blocks/fields/built-in-fields/number'
                    },
                    {
                      title: '文本输入',
                      path:
                        '/guides/create-custom-blocks/fields/built-in-fields/text-input'
                    },
                    {
                      title: '变量',
                      path:
                        '/guides/create-custom-blocks/fields/built-in-fields/variable'
                    }
                  ]
                },
                {
                  title: '自定义字段',
                  children: [
                    {
                      title: '总览',
                      path:
                        '/guides/create-custom-blocks/fields/customizing-fields/overview'
                    },
                    {
                      title: '创建自定义字段',
                      path:
                        '/guides/create-custom-blocks/fields/customizing-fields/creating'
                    },
                    {
                      title: '扩展已有字段',
                      path:
                        '/guides/create-custom-blocks/fields/customizing-fields/extending'
                    },
                    {
                      title: '升级自定义字段',
                      path:
                        '/guides/create-custom-blocks/fields/customizing-fields/upgrading'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          title: '应用集成',
          children: [
            {
              title: '最佳实践',
              path: '/guides/app-integration/best-practices'
            },
            {
              title: '生成并运行 JavaScript',
              path: '/guides/app-integration/running-javascript'
            },
            {
              title: '源于 Blockly',
              path: '/guides/app-integration/attribution'
            }
          ]
        },
        {
          title: '修改 Blockly',
          children: [
            {
              title: '贡献',
              children: [
                {
                  title: '总览',
                  path: '/guides/modify/contributing'
                },
                {
                  title: '提一个好 issue',
                  path: '/guides/modify/contribute/write_a_good_issue'
                },
                {
                  title: '提一个好的合并请求',
                  path: '/guides/modify/contribute/write_a_good_pr'
                },
                {
                  title: '代码评审过程',
                  path: '/guides/modify/contribute/pr_review_process'
                },
                {
                  title: '写一个好的代码实验室',
                  path: '/guides/modify/contribute/write_a_codelab'
                },
                {
                  title: '添加一个插件',
                  path: '/guides/modify/contribute/add_a_plugin'
                }
              ]
            },
            {
              title: '开发设置',
              path: '/guides/modify/development_setup'
            },
            {
              title: '副本化 Blockly',
              path: '/guides/modify/forking_blockly'
            },
            {
              title: '构建',
              path: '/guides/modify/building'
            },
            {
              title: '编译进阶',
              path: '/guides/modify/advanced'
            },
            {
              title: '翻译',
              path: '/guides/modify/translating'
            },
            {
              title: '单元测试',
              path: '/guides/modify/unit-testing'
            },
            {
              title: '风格指南',
              path: '/guides/modify/style-guide'
            }
          ]
        },
        {
          title: '插件',
          children: [
            {
              title: '总览',
              path: '/guides/plugins/overview'
            },
            {
              title: '使用 Blockly 的 API',
              path: '/guides/plugins/using_blockly_apis'
            },
            {
              title: '调试',
              path: '/guides/plugins/debugging'
            },
            {
              title: '命名约定',
              path: '/guides/plugins/naming'
            },
            {
              title: '接口定义',
              children: [
                {
                  title: '总览',
                  path: '/guides/plugins/interfaces/overview'
                },
                {
                  title: '连接检查',
                  path: '/guides/plugins/interfaces/connection_checker'
                },
                {
                  title: '度量管理',
                  path: '/guides/plugins/interfaces/metrics_manager'
                }
              ]
            }
          ]
        }
      ]
    }
  }
};
