const navConfig = require('./config/navConfig.js')
// const sidebarConfig = require('./config/sidebarConfig.js')

module.exports = {
    base:'/',//部署站点的基础路径,默认/
    // lang: 'zh-CN',//语言设置
    locales: {
        "/": {
            lang: "zh-CN",
        },
    },
    title: '开发之道',
    description: '道阻且长，行者将至',
    author: 'lzs',

    head: [
        ['link', { rel: 'icon', href: '/logo.gif' }],//title头部的ioc
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }], // 移动端适配问题
        ['meta', { name: 'keywords', content: '编程,Java,博客,lzs,forlzs,生活'}],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['script', {}, `
            var _hmt = _hmt || [];
            (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?4819e29677ae6ad3eb95dc704d3a00df"; 
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
            })();`
        ]
    ],

    markdown: {
        lineNumbers: true,
        externalLinks: {
            target: '_blank', rel: 'noopener noreferrer' 
        },
        toc: {
            includeLevel:[1, 2, 3, 4]
        },
        // extractHeaders: [ 'h1','h2', 'h3' ],
        // extendMarkdown: md => {
        //     // 使用更多的 markdown-it 插件!
        //     md.use(require('markdown-it-xxx'))
        // }
    },

    theme: 'reco',
    themeConfig: {
        nav: navConfig,  // 右上角导航
        // 博客配置
        type: 'blog',
        blogConfig: {
            category: {
                location: 2,     // 在导航栏菜单中所占的位置，默认2
                text: '分类'     // 默认文案 “分类”
            },
            tag: {
                location: 3,     // 在导航栏菜单中所占的位置，默认3
                text: '标签'     // 默认文案 “标签”
            },
            socialLinks: [     // 信息栏展示社交信息
                { icon: 'reco-github', link: 'https://github.com/TrumanWood' },
                { icon: 'reco-mayun', link: 'https://gitee.com/lzs_space_dev' }
            ]
        },
        logo: '/logo.gif',
        authorAvatar: '/logo.gif',

        search: true,
        searchMaxSuggestions: 10,
        subSidebar: 'auto',
        author: 'lzs',
        record: 'Copyright',

        // 友联
        friendLink: [
            {
              title: 'vuepress-theme-reco',
              desc: 'A simple and beautiful vuepress Blog & Doc theme.',
              logo: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
              link: 'https://vuepress-theme-reco.recoluan.com'
            },
        ],
         // 密钥
        // keyPage: {
        //     keys: ['e10adc3949ba59abbe56e057f20f883e'], // 1.3.0 版本后需要设置为密文
        //     color: '#42b983', // 登录页动画球的颜色
        //     lineColor: '#42b983' // 登录页动画线的颜色
        // },
        
        // sidebar: sidebarConfig, //侧边栏
        // sidebarDepth: 4,//侧边栏自动提取文章的几层标题
        // sidebarOpen: false, // 初始状态是否打开侧边栏，默认true
        // updateBar: {
        //     // 最近更新栏
        //     showToArticle: true, // 显示到文章页底部，默认true
        //     moreArticle: "/archives", // “更多文章”跳转的页面，默认'/archives'
        // },
        // lastUpdated: 'true', // string | boolean 基于git commit时间
        // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接 自动地根据当前页面的侧边栏的顺序来获取。
        nextLinks: true,
        // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
        prevLinks: true,
        
        
        // 项目开始时间，只填写年份
        startYear: '2020',
        // 备案
        // record: 'ICP 备案文案',
        // recordLink: 'ICP 备案指向链接',
        cyberSecurityRecord: '渝ICP备19015909号-2',
        cyberSecurityLink: 'http://beian.miit.gov.cn/',
        noFoundPageByTencent: false, //404 腾讯公益
        // 搜索，支持中文 申请地址：https://docsearch.algolia.com/apply/ 
        // 参考地址：https://blog.csdn.net/weixin_40026797/article/details/126063524
        // algolia: {
        //     apiKey: '<API_KEY>',
        //     indexName: '<INDEX_NAME>',
        //     // 如果 Algolia 没有为你提供 `appId` ，使用 `BH4D9OD16A` 或者移除该配置项
        //     appId: '<APP_ID>',
        // }
        valineConfig: {
            appId: '8IniDw0PHTyJF7o8FqXEVKzf-gzGzoHsz',// your appId 018-慕课网体系课-2022年Java亿级项目架构设计与落地应用
            appKey: 'nrfvGB1PpGTmzHyER8MTE2S5', // your appKey
            // visitor: false, //#是否允许游客评论
            recordIP: true,
            
        },

    },
    
    plugins: [
        // ['@vuepress/last-updated', 
        //   {
        //     transformer: (timestamp, lang) => {
        //       return (new Date(timestamp)).toUTCString() 
        //       //或者用下面这段
        //       // const moment = require('moment')
        //       // moment.locale(lang)
        //       // return moment(timestamp).toLocaleString()
        //     }
        //   }],
        // 每页长度
        ['@vuepress-reco/vuepress-plugin-pagation', {
          perPage: 16
        }],
        ['sitemap', {
          hostname: 'http://forlzs.cn'
        }],
        ["@vuepress/medium-zoom",
            {
                selector: ".zoom", // 指定含有medium-zoom的类缩放,后面这个类名可自定义,markdown中的img的class类保持一致就可以了的,没有指明的图片类将不支持缩放
                delay: 1000, // 延迟1秒
                options: {
                margin: 24,
                scrollOffset: 0
                }
            }
        ],
        // ['@vuepress/pwa', {
        //     serviceWorker: true,
        //     updatePopup: {
        //         message: "发现新内容可用",
        //         buttonText: "刷新"
        //     }
        // }],
        ['@vuepress/active-header-links', {
            sidebarLinkSelector: '.sidebar-link',
            headerAnchorSelector: '.header-anchor'
        }],
        [
            "vuepress-plugin-auto-sidebar",
              {
                titleMode: "titlecase", // 标题模式
                collapsable: true,     // 设置为true,开启折叠
                sidebarDepth: 2,    // 标题的深度
                collapseList: [
                  // 折叠的路由列表
                  // "/frontend/css/"
                ],
                uncollapseList: [
                  // 不折叠的路由列表
                ]
              }
        ],
        ['@vuepress/search', {
            searchMaxSuggestions: 10
        }],
        //全文检索（对中文分词不友好）
        ['flexsearch'],
        // 多语言代码Tab
        ['@vuepress-reco/extract-code'],
        // [
        //     "vuepress-plugin-nuggets-style-copy",
        //     {
        //       copyText: "复制代码",
        //       tip: {
        //         content: "复制成功",
        //       },
        //     },
        // ],
    ]
  
}