var http = require('http');
var express = require('express');
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var APIKEY="e8684542282afc2f2d2c4d74287c11c8";       //**your API key***
var options = {
    host: 'www.apilayer.net',
    port: 80,
    path: '/api/live?access_key=' + APIKEY,
    method: 'GET'
};
// Pass by Reference
function getCurrency(data) {
    // http request
    var req = http.request(options, function(res) {
        var success = 'N/A';
        var sources = 'N/A';
        var AUD = 'N/A';
        // set header
        res.setEncoding('utf8');
        // Receive response of data
        res.on('data', function (chunk) {
            var jsonObj = JSON.parse(chunk);
            success = jsonObj.success;
            sources =jsonObj.source;
            AUD = jsonObj.quotes.USDAUD*1000;
        });
        res.on('error', function(e) {
            console.log('Problem with request: ' + e.message);
        });

        // Return Value
        res.on('end',function(chunk) {
            data({currTemp: success,
                maxTemp: sources,
                minTemp: AUD});
        });
    });
    req.end();}


app.get('/',function(req,res) {
    // put the callback into data part
    getCurrency(function(data){
        data.city = "USD-AUD";
        res.render('weather', data);
    });
}); // end of app.get()


app.listen(process.env.PORT || 8099);