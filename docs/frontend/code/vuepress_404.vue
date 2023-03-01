<!-- 404页面 
修改默认的404页面
当然也不喜欢腾讯的公益页面就可配置
node_modules\vuepress-theme-reco\layouts\404.vue
-->
<article class="content">
  <img src="/img/404.svg" style="width: 80%;">
  <blockquote>{{ getMsg() }}</blockquote>
  <router-link to="/">Take me home.</router-link>
</article>