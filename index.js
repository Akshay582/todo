const express = require('express');
const port = 8000;

const app = express();

app.listen(port, function(err){
    if(err){
        console.log('The server is screwed. Fix it please!')
    }
    console.log("The server is running at:", port);
});