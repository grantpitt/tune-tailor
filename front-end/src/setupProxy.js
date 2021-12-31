const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://server.tunetailor.app",
      changeOrigin: true,
    })
  );
};
