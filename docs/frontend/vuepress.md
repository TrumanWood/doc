---
title: 使用VuePress快速搭建博客
date: 2022-09-12 15:39:13
permalink: /front/vuepress
sidebar: 'auto'
categories:
 - 前端
tags:
  - VUE
  - Vuepress
---

# vuepress
关于什么是Vuepress，官网已经写得很清楚了，简而言之就是讲Markdown 转 blog

## 0x01 extract-code使用
> @vuepress-reco/vuepress-plugin-extract-code

插件地址：[https://github.com/vuepress-reco/vuepress-plugin-extract-code](https://github.com/vuepress-reco/vuepress-plugin-extract-code)
::: tip
路径必须从docs开始
:::

## 0x02 其他修改
####  修改theme下的页面
> 路径：node_modules\vuepress-theme-reco\

<RecoDemo :collapse="true">
  <template slot="code-404">
    <<< @/docs/frontend/code/vuepress_404.vue
  </template>
  <template slot="code-footer">
    <<< @/docs/frontend/code/vuepress_footer.vue
  </template> 
  <template slot="code-page">
    <<< @/docs/frontend/code/vuepress_page.vue
  </template> 
</RecoDemo>

## 0x00 参考文档
1. [VuePress官网](https://v1.vuepress.vuejs.org/zh/)
2. [blog-余温旧梦-王世彪的博客](https://blog.sofineday.com/vuepress-theme-vdoing.html#%E4%BF%AE%E6%94%B9%E9%85%8D%E7%BD%AE)
3. [主题-vuepress-theme-reco](https://vuepress-theme-reco.recoluan.com/)
4. [blog-使用vuepress-theme-reco搭建自己的博客.2022](https://blog.csdn.net/qq_41327483/article/details/119103300)
5. [【vuepress】主题vuepress-theme-reco使用及配置.2023](https://blog.csdn.net/m0_50853977/article/details/128831526)
6. [blog-VuePress 博客之 SEO 优化（三）标题、链接优化.2022](https://www.jishuya.cn/1446.html)
7. [valine](https://valine.js.org/)
8. [leancloud](https://console.leancloud.cn/apps)
9. [extract-code](https://github.com/vuepress-reco/vuepress-plugin-extract-code)