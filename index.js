const express = require('express');
const path = require('path');
const port = 8000;

// to check if the db is connected or not
const db = require('./config/mongoose');
// for the schema of the todo in db
const Todo = require('./models/todo');

const app = express();
// for scss
const sassMiddleware = require('node-sass-middleware');

// configuring scss
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

// configuring static files
app.use(express.static(__dirname + '/assets'));
app.use(express.urlencoded({
    extended: true
}));

// configuring views, only home ejs in this case
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// for homepage
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

// for creating a todo
// it also gives a comment in the npm console
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

// to delete a todo
app.get('/delete-todo', function(req, res){
    let id = req.query.id;
    for(let a = 0; a < id.length - 1; a++){
        Todo.findByIdAndDelete(id[a], function(err){
            if(err){
                console.log('error in deleting the object from the connected database');
                return;
            } 
        })
    }
    return res.redirect('back');
});

// The server is up and running
app.listen(port, function(err){
    if(err){
        console.log('The server is screwed. Fix it please!')
    }
    console.log("The server is running at:", port);
});