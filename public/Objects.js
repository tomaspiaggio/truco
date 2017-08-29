// VARIABLES
var teams;

//Objects
var User = function(name, id){
    this.name = name;
    this.id = id;
}

var Team = function(users, color){
    this.users = users;
    this.score = 0;
    this.color = color;
}

var Card = function(palo, number){
    this.palo = palo;
    this.number = number;
}

var Hand = function(cards, envido, truco){
    this.cards = cards;
    this.envido = envido;
    this.truco = truco;
}

var Graph = function(){
    this.nodes = [];
}

var Node = function(value, available){
    this.value = value;
    this.next;
    this.prev;
    this.available = available;
}

Hand.prototype.playCard = function(){
    // Removes card from hand and plays it
};

Team.prototype.addScore = function(points){
    this.score += points;
    // if points > 30 -> win
};


// FUNCTIONS

// Envido 0
// Envido Envido 1
// Real Envido 2
// Falta Envido 3
// Truco 0
// Retruco 1
// Vale4 2
function initHandEnvido(cards, isFoot){
    var envido = new Graph();
    var envido2 = new Node({wanted: 6, unwanted: this.prev.value.wanted}, false);
    var real = new Node({wanted: this.prev.value.wanted + 3 || 3, unwanted: this.prev.value.wanted || 1}, true);
    var falta = new Node({wanted: (teams[0].value > teams[1].value)? 1 : 1/*TODO: Terminar */, unwanted: this.prev.value.wanted || 1}, true);
    if(isFoot){
        var envido1 = new Node({wanted: 2, unwanted: 1}, true);
        envido1.next = envido2;
        envido2.prev = envido1;
    }
    real.next = falta;
    envido2.next = real;
    real.prev = envido2;
    falta.prev = real;
    envido.nodes.push(envido1);
    envido.nodes.push(envido2);
    envido.nodes.push(real);
    envido.nodes.push(falta);

    return envido;
}

// Truco 0
// Retruco 1
// Valecuatro 2
function initHandTruco(){
    var truco = new Graph();
    var truco1 = new Node({wanted: 2, unwanted: 1}, true);
    var retruco = new Node({wanted: 3, unwanted: 2}, false);
    var valecuatro = new Node({wanted: 4, unwanted: 3}, false);
    retruco.next = valecuatro;
    truco1.next = retruco;
    truco.nodes.push(truco);

    return truco;
}
