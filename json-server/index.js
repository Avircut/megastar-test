const path = require('path');
const jsonServer = require('json-server');

const server = jsonServer.create();
server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use((async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 800);
  });
  next();
}));

server.use(router);

server.listen(8000, () => {
  console.log('server is running on 8000 port');
});
