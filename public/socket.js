var socket = io();
var body = document.querySelector('body');
var table = document.querySelector('.mod--table');
var index = 0;

socket.on('connection', function(){
    initialization();
    gameplay();
    chat();
});

// FUNCTIONS


// EVENTS

function chat(){
    socket.emit('my-message', message); // Se manda mensaje a todos (id::message)
    socket.on('incoming-message', message) ; // Llega el mensaje y se pone en el chat (id::message)
}

function gameplay(){

    // Server
    socket.on('new-hand', newHand); // Alguien gana o pierde, se suman los puntos y se borran las manos
    socket.on('card', addCardToHand); // Te llega una carta de cuando se reparte y la agregas al OBJETO mano

    // Other players
    socket.on('received-action', askForReply); // Te llega una pregunta como truco o re truco checkear si contesto yo u otro (user::action)
    socket.on('user-viewing', show); // Alguien me esta mirando checkear si ambos nos estamos mirando que se muestren permanente los nombres (id)
    socket.on('user-played', showcardontable); // Un usuario juega y me llega que jugo y lo muestro en mesa (user::card)

    // Me
    socket.emit('action', user) // Mando una accion (id::action)
    socket.emit('user-clicked', user); // Manda que lo clickeo y recibe si manda alguna seña y ademas le manda al otro que te estan mirando (mi-id::su-id)
    socket.emit('card-played', card); // Mando una carta que jugue (id::card)

}

/**
  * Things that are done on connection
  */
function initialization(){
    // If user does not exist, it creates a new one from the back end and saves it to localStorage
    socket.on('user-created', saveUser); // (id::name)

    // Checks if user exists
    var user = localStorage.getItem('user');
    if(user) socket.emit('user', user);
    else socket.emit('create-user', askForName());
}

function saveUser(name, id){
    localStorage.setItem(id, name);
}

/**
  * @param teams receives a Team object with the players already set
  */
function renderTeams(teams){
    for(i = 0; i < teams[0].users.length; i++){
        renderUser(teams[0].users[i]);
        renderUser(teams[1].users[i]);
    }
}

function renderUser(user){
    // Creating elements
    var player = document.createElement("DIV");
    var name = document.createElement('DIV');
    var nameh1 = document.createElement('H1');
    var face = document.createElement('FIGURE');
    var img = document.createElement('IMG');

    // Setting child elements to parents
    img.setAttribute('src', 'http://img.thedailybeast.com/image/upload/v1494008886/articles/2017/04/03/the-internet-s-most-famous-pregnant-giraffe-still-hasn-t-given-birth/170403-jones-pregnant-giraffe-tease_alsbhr.jpg');
    face.appendChild(img);
    player.appendChild(face);
    name.appendChild(nameh1);
    player.appendChild(name);

    // Adding classes for css
    player.classList.add('mod__player');
    face.classList.add('player__face');
    nameh1.classList.add('player__name');
    name.classList.add('player__header');

    // Setting name
    nameh1.textContent = user.name;

    // Setting created user to DOM
    table.appendChild(player);
}


function init(){
    // NO BORRAR
    // table = document.createElement('DIV');
    // table.classList.add('mod--table');
    // body.appendChild(table);

    // BORRAR
    var user1 = new User("Tomas", 1);
    var user2 = new User("Julio", 2);
    var user3 = new User("Pablo Obeso", 3);
    var user4 = new User("Pato M", 4);
    var user5 = new User("Nico V", 5);
    var user6 = new User("Mati V", 6);

    var teams = [];
    teams.push(new Team([user1, user3, user5]));
    teams.push(new Team([user2, user4, user6]));

    renderTeams(teams);

    // renderUser(user1);
    // renderUser(user2);

}

window.onload = init;


/**
  * Shows a popup that asks for the user's name
  * @return the name of the user
  */
function askForName(){
    // Hacer un popup que le pida el nombre y devolverlo
}
