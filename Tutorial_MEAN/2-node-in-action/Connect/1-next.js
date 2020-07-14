var connect = require('connect');
var favicon = require('serve-favicon');

function logger(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
}

function hello(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello world');
}

connect()
    .use(favicon(__dirname + '/image/512.jpg'))
    .use(logger)
    .use(hello)
    .listen(3000);