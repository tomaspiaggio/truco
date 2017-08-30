/**
 * Created by Tomas on 6/14/17.
 */

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var database = require('./database.js');
var databaseInfo = {
  host: "localhost",
  user: "root",
  password: "qwer",
  database: "truco"
};

var users = [];

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

    // database.postUser(mysql.createConnection(databaseInfo), "Tomas P.", (data) => {
    //
    // });

    // UNTESTED
    socket.on('create', function(name){
        console.log('User created: ' + socket.id);
        var id;
        database.postUser(mysql.createConnection(databaseInfo), name, (data) => id = data);
        socket.join(id);
        users[id] = name;
        io.sockets.in(id).emit('create', id + '::' + name);
    });


    // UNTESTED
    socket.on('connect', function(id){
        var user = database.getUser(id);
        var result;
        database.getUser(mysql.createConnection(databaseInfo), id).then((data) => result = data);
        clients[result.id] = result.name;
    });

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

// io.on('connection', function(socket){
//
//     // ON CREATED
//
//     // User connected and room created
//     socket.on('create', function(room){
//         console.log('User connected: ' + socket.id);
//         socket.join(room);
//         users[socket.id] = room;
//         io.sockets.in(superuserRoom).emit('newUser', socket.id);
//     });
//
//     // Super user connected and room crated
//     socket.on('SUcreate', function(room){
//         superuserRoom = room;
//         socket.join(room);
//     });
//
//     // ON MESSAGE
//
//     // User Message
//     socket.on('message', function(msg){
//         io.sockets.in(superuserRoom).emit('message', socket.id + ';' + msg);
//     });
//
//     // Super user message
//     socket.on('SUmessage', function(msg){
//         var index = msg.indexOf(';');
//         io.sockets.in(users[msg.substring(0, index)]).emit('SUmessage', msg.substring(index + 1, msg.length));
//     });
//
//     // ON DISCONNECT
//
//     // User Disconnected
//     socket.on('disconnect', function(){
//         users.splice(users.indexOf(socket.id), 1);
//         io.sockets.in(superuserRoom).emit('userDisconnected', socket.id);
//     });
// });

http.listen(3000, function () {
    console.log("Listening on port: 3000")
});
