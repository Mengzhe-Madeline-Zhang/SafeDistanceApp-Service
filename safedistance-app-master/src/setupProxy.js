const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://prod.mengchen-gao.me',
      changeOrigin: true,
    })
  );
};