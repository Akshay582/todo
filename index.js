const express = require('express');
const path = require('path');
const port = 8000;

const app = express();

app.use(express.static(__dirname + '/assets'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req, res){
    return res.render('home', {
        title: "HomePage"
    });
});

// The server is up and running
app.listen(port, function(err){
    if(err){
        console.log('The server is screwed. Fix it please!')
    }
    console.log("The server is running at:", port);
});