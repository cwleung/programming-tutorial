var monogoose = require('mongoose');
var db = mongoose.conenct('mongodb://localhost/tasks');

var Schema = mongoose.Schema;
var Tasks = new Schema({
    project: String,
    description: String
});
monogoose.model('Task', Tasks);

var Task = monogoose.model('Task');
var task = new Task();

// Save Function
task.project = 'Bikeshed';
task.decription = 'Paint the bikeshed red.';
task.save(function (err) {
    if (err)throw err;
    console.log('Task saved');
});

// Find Function
var Task  = mongoose.model('Task');
Task.find({'project':'Bikeshed'},function(err,tasks){
    for (var i = 0 ; i<tasks.length;i++){
        console.log('ID'+tasks[i]._id);
        console.log(task[i].description)
    }
});
// Update the file
var Task2  = mongoose.model('Task');
Task2.update(
    {project:'Bikeshed'},
    {description:'Hello World'}
);