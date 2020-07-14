var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});

var bodyParser = require('body-parser').urlencoded({extended: true});
var parseurl = require('parseurl');
var cookieParser = require('cookie-parser')(credentials.cookieSecret);

var fs = require("fs");
var formidable = require('formidable');

var credentials = require('./credentials.js');

var session = require('express-session')({
    resave: false,   // only save in store
    saveUninitialized: true,
    secret: credentials.cookieSecret
});

var app = express();

app.engine('handlebars', handlebars.engine)
    .set('view engine', 'handlebars')
    .use(express.static(__dirname + '/public'))
    .use(bodyParser)
    .use(cookieParser)
    .use(session);

function auditTimes(req, res, next) {
    var views = req.session.views;
    if (!views) {
        views = req.session.views = {};
    }
    var pathname = parseurl(req).pathname;
    views[pathname] = (views[pathname] || 0) + 1;
    next();
}
function viewcount(req, res, next) {
    res.send('You viewed this page ' + req.session.views['/viewcount'] + ' times');
}
function audit(req, res, next) {
    console.log("looking for URL" + req.url);
    next();
}
function errorReceiver(err, req, res, next) {
    console.log('Error: ' + err.message);
    next();
}

function about(req, res) {
    res.render('about');
}
function home(req, res) {
    res.render('home');
}
function junk(req, res, next) {
    console.log('Tried to access /junk');
    throw new Error('/junk doesn\'t exist');
}
function contact(req, res) {
    res.render('conrtact', {csrf: 'CSRF token here'})
}
function upload(req, res) {
    var now = new Date();
    res.render('file-upload', {
        year: now.getFullYear(),
        month: now.getMonth()
    });
}
function uploadNow(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req,
        function (err, fields, file) {
            if (err)
                return res.redirect(303, '/error');
            console.log('Received File');
            console.log(file);
            res.redirect(303, '/thankyou');
        });
}

function rend404(req, res) {
    res.type('text/html');
    res.status(404);
    res.render('404');
}
function rend500(err, req, res, next) {
    console.err(err.stack);
    res.status(500);
    res.render('500');
}
function process(req, res) {
    console.log('Form' + req.query.form);
    console.log('CSRF token : ' + req.body._csrf);
    console.log('E-mail : ' + req.body.email);
    console.log('Question : ' + req.body.ques);
    res.redirect(303, '/thankyou');
}
function thankyou(req, res) {
    res.render('thankyou')
}

function cookieFunc(req, res) {
    res.cookie('username', 'Derek', {expire: new Date() + 9999})
        .send('username has the value of Derek Banas');
}
function listCookie(req, res) {
    console.log("Cookies : ", req.cookies);
    res.send('Look in the console for cookies');
}
function clearCookie(req, res) {
    res.clearCookie('username');
    res.send('username has been deleted');
}

function readFile(req, res, next) {
    fs.readFile('./public/randomfile.txt', function (err, data) {
        if (err) {
            return console.error(err);
        }
        res.send('the File : ' + data.toString());
    })
}
function writeFile(req, res, next) {
    fs.writeFile('./public/randomfile2.txt', 'More random text', function (err) {
        if (err) {
            return console.error(err);
        }
    });
    fs.readFile('./public/randomfile2.txt', function (err, data) {
        if (err) {
            return console.error(err);
        }
        res.send("The File" + data.toString());
    });
}

app.use(audit)
    .use(auditTimes)
    .get('/', home)
    .get('/junk', junk)
    .get('/about', about)
    .get('/contact', contact)
    .get('/thankyou', thankyou)
    .get('/file-upload', upload)
    .get('/file-upload/:year/:month', uploadNow)
    .get('/cookie', cookieFunc)
    .get('/listcookie', listCookie)
    .get('/deletecookie', clearCookie)
    .get('/viewcount', viewcount)
    .get('/readfile', readFile)
    .get('/writefile',writeFile)
    .post('/process', process);

app.use(errorReceiver)
    .use(rend404)
    .use(rend500);

app.listen(3000, function () {
    console.log('Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to terminate');
});