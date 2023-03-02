/**
 * 每当切换路由就会触发统计上报。所以发生如下行为时会上报统计:
    首次访问
    刷新页面
    切换到当前文章的其它章节
    切换锚点，URL 会变化，所以会触发路由变化事件。[已优化]
    所以，当用户完整得浏览完一篇博客时，可能会触发多次上报。
 */
export default ({ router }) => {
    /**
     * 路由切换事件处理
     */
    router.beforeEach((to, from, next) => {
      
      //触发百度的pv统计
      if (typeof _hmt != "undefined") {
        if (to.path) {
          try {
            let toPath = to.fullPath;
            let fromPath = from.fullPath;
            if (!(toPath.split("#")[0] == fromPath.split("#")[0])) {
              _hmt.push(["_trackPageview", to.fullPath]);
              console.log("t上报百度统计", to.fullPath);
            }
          } catch (error) {
              _hmt.push(["_trackPageview", to.fullPath]);
              console.log("c上报百度统计", to.fullPath);
          }
        }
      }
      next();
    });
  };