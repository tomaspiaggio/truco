/**
 * Created by Tomas on 6/14/17.
 */

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
// var database = require('./database.js');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qwer",
  database: "truco"
});

// App Starts Here
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/objects.js', function(req, res){
    res.sendFile(__dirname + '/public/objects.js');
});

app.get('/index.css', function(req, res){
    res.sendFile(__dirname + '/public/index.css');
});

app.get('/socket.js', function(req, res){
    res.sendFile(__dirname + '/public/socket.js');
});

// Socket.io

io.on('connection', function(socket){
    console.log("User connected");
    // VER DE HACER LO DE LOS ROOMS QUE HICE EN EL CHAT DE SHOPIFY
    socket.on('user-clicked', function(user){ // (mi-id::su-id)

    });
    socket.on('card-played', function(card){ // (id::card)

    });
    socket.on('action', function(user){ // (id::action)

    });
    socket.on('disconnect', function () {
        console.log("User disconnected");
    });
});

http.listen(3000, function () {
    console.log("Listening on port: 3000")
});
