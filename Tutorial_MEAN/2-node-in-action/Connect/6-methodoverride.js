var connect = require('connect');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var methodOverride =require('method-override');

function edit(req, res, next) {
    if ('GET' != req.method) return next();
    res.setHeader('Content-Type', 'text/html');
    res.write('<form method="post">');
    res.write('<input type="hidden" name="_method" value="put" />');
    res.write('<input type="text" name="user" value="Tobi" />');
    res.write('<input type="submit" value="Update" />');
    res.write('</form>');
    res.end();
}

function update(req, res, next) {
    if ('PUT' != req.method) return next();
    res.end('Updated name to ' + req.body.user);
}

var app = connect()
    .use(bodyParser.urlencoded({extended: true}))
    .use(methodOverride('_method'))
    .use(edit)
    .use(update)
    .listen(3000);