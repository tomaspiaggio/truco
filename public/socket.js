var socket = io();
var body = document.querySelector('body');
var table = body.querySelector('.mod--table');
var red = body.querySelector('.red');
var blue = body.querySelector('.blue');
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
    // (id::name)
    socket.on('create', function(idAndName){
        var decomposed = decompose(idAndName);
        localStorage.setItem('name', decomposed.second);
        localStorage.setItem('userId', decomposed.first);
    });

    // Checks if user exists
    var user = localStorage.getItem('userId');
    if(user) socket.emit('connect', user);
    else socket.emit('create', askForName());
}

function saveUser(name, id){
    localStorage.setItem(id, name);
}

/**
  * @param teams receives a Team object with the players already set
  */
function renderTeams(teams){
    for(i = 0; i < teams[0].users.length; i++){
        renderUser(teams[0].users[i], teams[0].color);
        renderUser(teams[1].users[i], teams[1].color);
    }
}

function renderUser(user, color){
    // Creating elements
    var player = document.createElement("DIV");
    var name = document.createElement('DIV');
    var media = document.createElement('DIV');
    var nameh1 = document.createElement('H1');
    var face = document.createElement('FIGURE');
    var img = document.createElement('IMG');

    // Setting child elements to parents
    img.setAttribute('src', 'http://img.thedailybeast.com/image/upload/v1494008886/articles/2017/04/03/the-internet-s-most-famous-pregnant-giraffe-still-hasn-t-given-birth/170403-jones-pregnant-giraffe-tease_alsbhr.jpg');
    face.appendChild(media);
    media.appendChild(img);
    player.appendChild(face);
    name.appendChild(nameh1);
    player.appendChild(name);

    // Adding classes for css
    player.classList.add('mod__player');
    face.classList.add('player__face');
    face.classList.add('player__face--' + color);
    nameh1.classList.add('player__name');
    name.classList.add('player__header');
    media.classList.add('player__media');

    // Setting name
    nameh1.textContent = user.name;

    // Setting created user to DOM
    table.appendChild(player);
}


function init(){
    // BORRAR
    var user1 = new User("Tomas", 1);
    var user2 = new User("Julio", 2);
    var user3 = new User("Pablo Obeso", 3);
    var user4 = new User("Pato M", 4);
    var user5 = new User("Nico V", 5);
    var user6 = new User("Mati V", 6);


    // NO BORRAR
    var teams = [];
    teams.push(new Team([user1, user3, user5], "red"));
    teams.push(new Team([user2, user4, user6], "blue"));
    renderTeams(teams);

}

window.onload = init;


/**
  * Shows a popup that asks for the user's name
  * @return the name of the user
  */
function askForName(){
    // Hacer un popup que le pida el nombre y devolverlo
    return "Tomas P.";
}

function decompose(text){
    var index = text.indexOf("::");
    return {first: text.substring(0, index), second: text.substring(index + 2, text.length)};
}
