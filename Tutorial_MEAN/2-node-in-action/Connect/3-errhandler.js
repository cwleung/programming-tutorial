var connect = require('connect');

function badMiddleware(req, res, next) {
    next(new Error('Bad middleware makes error'));
}

function errorHandler(req, res) {
    // Receive Err Parameter
    return function (err, req, res, next) {
        res.statusCode = 500;
        res.end('Internal Error!');
    }
}

connect()
    .use(badMiddleware)
    .use(errorHandler)
    .listen(3020);

