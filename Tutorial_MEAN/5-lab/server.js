var app = require('express')();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mongoose');
var Schema = mongoose.Schema;

var profileSchema = new Schema({
    name: String,
    age: String,
    nation: String
});

app.set('view engine', 'ejs');
// Insert
app.get('/', function (req, res) {
    var query = req.query;
    console.log(query);
    res.render('profile.ejs', query);
    var profile = mongoose.model('profile', profileSchema);

    var newR = new profile(query);
    newR.save(function (err) {
        if (err)throw err;
        console.log('Task saved');
    });
});

var mongoclient = require('Mongodb').MongoClient;


app.get('/insert', function (req, res) {
    var profile = [];
    mongoclient.connect("mongodb://localhost:27017/mongoose", function (err, db) {
        db.collection('profiles').find().each(function (err, row) {
            if (row != null) {
                profile.push(row);
            } else{db.close();}
        });
    });
    res.write("Hello");
    res.end(JSON.stringify(profile))
});

app.get('/read', function (req, res) {
    var profile = mongoose.model('profile', profileSchema);
    profiles = {};
    profiles['profile'] = [];
    profile.find(function (err, result) {
        for (var i = 0; i < result.length; i++) {
            profiles['profile'][i] = {};
            profiles['profile'][i]['name'] = (result[i].name);
            profiles['profile'][i]['age'] = (result[i].age);
            profiles['profile'][i]['nation'] = (result[i].nation);
        }
    });
    console.log(profiles['profile'].length);
    res.render('profile.ejs', profiles);
});
app.listen(3000);
