/**
 * Created by Tomas on 6/14/17.
 */

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var serverRoom = 'useruserroom';
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
    if(req.query.id != null){
        res.sendFile(__dirname + '/public/index/index.html');
    } else {
        res.sendFile(__dirname + '/public/connect/connect.html');
    }
});

// INDEX
app.get('/objects.js', function(req, res){
    res.sendFile(__dirname + '/public/index/objects.js');
});

app.get('/index.css', function(req, res){
    res.sendFile(__dirname + '/public/index/index.css');
});

app.get('/socket.js', function(req, res){
    res.sendFile(__dirname + '/public/index/socket.js');
});

// CONNECT
app.get('/connect.js', function(req, res){
    res.sendFile(__dirname + '/public/connect/connect.js');
});

app.get('/connect.css', function(req, res){
    res.sendFile(__dirname + '/public/connect/connect.css');
});

// CREATE
app.get('/create', function(req, res){
    res.sendFile(__dirname + '/public/create/create.html');
});

app.get('/create.js', function(req, res){
    res.sendFile(__dirname + '/public/create/create.js');
});

app.get('/create.css', function(req, res){
    res.sendFile(__dirname + '/public/create/create.css');
});


// Socket.io

io.on('connection', function(socket){
    // database.postUser(mysql.createConnection(databaseInfo), "Tomas P.", (data) => { do something with data });
    socket.on('create', function(name){
        console.log('User created: ' + socket.id);
        database.postUser(  mysql.createConnection(databaseInfo), name, (id) => {
            socket.join(id);
            users[id] = name;
            io.sockets.in(id).emit('create', id + '::' + name);
        });
    });

    socket.on('connect', function(id){
        console.log(id);
        database.getUser(mysql.createConnection(databaseInfo), id).then((data) => {
            clients[data.id] = data.name;
            console.log("User connected: " + data.name);
        });
    });

    socket.on('my-message', function(message){
        var decomposed = decompose(message);
        // database.getAllUsersFromGame(mysql.createConnection(databaseInfo), /*GAME ID*/, () => {
        //     socket.emit('incoming-message', message); //emitir a todos el mensaje y ver lo de los rooms
        // });
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


// FUNCTIONS

function decompose(text){
    var index = text.indexOf("::");
    return {first: text.substring(0, index), second: text.substring(index + 2, text.length)};
}
