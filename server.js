"use strict"
//set express -> framework server
const app = require('express')();
//set http server with express
const http = require("http").Server(app);
//set socket.io with http
const io = require("socket.io")(http);

// if server called -> express response (res) with currentDir/index.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// for every user is connected -> execute function
io.on('connection', function(socket){
    console.log('Raspberry connected');

    // for every user is disconnected -> execute function
    io.on('disconnect', function(){
        console.log('Raspberry disconnected');
    });

    // listen every message with an event named 'bikeAmper'
    socket.on('bikeAmper', function (amp){
        console.log(amp);
    });
})

//lauch server that listen :8888 (80 port)
http.listen(8888, function () {
    console.log("Server running on : 8888")
});
