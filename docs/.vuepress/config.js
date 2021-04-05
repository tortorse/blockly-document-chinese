module.exports = {
  title: "Blockly",
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guides/overview" },
      { text: "External", link: "https://google.com" },
    ],
    sidebar: {
      "/guides": [
        "/guides/overview",
        "/guides/get-started",
        {
          title: "配置 Blockly",
          children: [
            {
              title: "固定大小的工作区",
              path: "/configure/fixed-size",
            },
            {
              title: "可调整大小的工作区",
              path: "/configure/resizable",
            },
          ],
        },
      ],
    },
  },
};
