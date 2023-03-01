<!-- footer
bolg页面不展示评论页面
路径：node_modules\vuepress-theme-reco\components\Page.vue
-->
<Comments style="display: none;" v-if="recoShowModule" :isShowComments="shouldShowComments"/>