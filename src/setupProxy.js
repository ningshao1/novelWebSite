const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    proxy("/api/**", {
      target: "http://shaoq.tpddns.cn:8088/",
      changeOrigin: true,
      pathRewrite: {
        "^/api": ""
      }
    }),
    proxy("/test/**", {
      target: "http://127.0.0.1:8077/",
      changeOrigin: true,
      pathRewrite: {
        "^/test": ""
      }
    })
  );
};
