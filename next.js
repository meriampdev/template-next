/* eslint-disable no-param-reassign */
const next = require('next');
const { join } = require('path');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './app' });
const handle = app.getRequestHandler();

module.exports = (async server => {
    await app.prepare();
    // Middleware to insert app and handle inside the req object.
    server.use('/', (req, res, n) => {
        req.app = app;
        req.handle = handle;
        n();
    });

    server.get('/app/:id', (req, res) => {
      const actualPage = '/menu'
      const queryParams = { title: req.params.id, id: req.params.id}
      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
      console.log('URL', req.url)
      if (req.url.includes('/sw')) {
        const filePath = join(__dirname, 'app/static', 'workbox', 'sw.js');
        app.serveStatic(req, res, filePath);
      } else if (req.url.startsWith('static/workbox/')) {
        app.serveStatic(req, res, join(__dirname, 'app/' + req.url));
      } else {
        handle(req, res, req.url);
      }
    });

    server.originalListen = server.listen;
    server.listen = (port) => {
        // If none of the custom routing handlers from express are hit,
        // defer to next's own handler.
        server.get('*', (req, res) => {
            req.handle(req, res);
        });
        server.originalListen(port);
    };
    return server;
});
