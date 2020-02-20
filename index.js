const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Todo = require('./models/todo');

const app = express();

app.use(express.static(__dirname + '/assets'));
app.use(express.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req, res){
    Todo.find({}, function(err, todos){
        if(err){console.log("Couldn't fetch the data from the db.");
        return;
    }
    return res.render('home', {
        title: "HomePage",
        todo_list: todos
    });
    });
});

app.post('/create-todo', function(req, res){
    Todo.create({
        description: req.body.description,
        category: req.body.category,
        dueDate: req.body.dueDate
    }, function(err, newTodo){
        if(err){console.log("Couldn't create the contact!");
        return;}
        console.log('New To-do!');
        return res.redirect('back');
    })
});

// The server is up and running
app.listen(port, function(err){
    if(err){
        console.log('The server is screwed. Fix it please!')
    }
    console.log("The server is running at:", port);
});