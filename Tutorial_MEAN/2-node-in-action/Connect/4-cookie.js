var connect = require('connect');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

function cookieFunc(req, res, next) {
    res.setHeader('Set-Cookie', 'foo=bar');
    res.setHeader('Set-Cookie', 'tobi=ferret; Expires = Tue,08 Jun 2021 10:18:14 GMT');
    console.log(req.cookies);
    console.log(req.signedCookies);
    next();
}

function bodyFunc(req,res){
    res.end('hello ' + req.body.userna+ '\n');
}

var app = connect();

app
    .use(favicon(__dirname + '/image/512.jpg'))
    .use(cookieParser)
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .use(cookieFunc)
    .use(bodyFunc)
    .listen(3000);