(function(window){
    // PRIVATE VARIABLES
    var players;
    var reqName;

    // INIT APP
    function init(){
        var user = localStorage.getItem('user');
        players = document.querySelector('.mod__players');
        if(user){
            addUser(user);
        }
        else{
            reqName = document.querySelector('.mod__request-name');
            askForName();
        }
        getGameId();
    }

    // REQUESTS NEW GAME ID
    function getGameId(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
            }
        };
        xhttp.open("GET", "/newgame", true);
        xhttp.send();
    }

    // POPUP THAT ASKS FOR PLAYER'S NAME
    function askForName(){
        reqName.classList.add('mod__request-name--active');
        document.querySelector('.mod__submit').addEventListener('click', function(){
            var input = document.querySelector('.mod__input');
            if(input.value != ''){
                addUser(input.value);
                reqName.classList.remove('mod__request-name--active');
                localStorage.setItem('user', input.value);
            }
        });
    }

    // ADDS USER TO DOM
    function addUser(user){
        var name = document.createElement('P');
        name.textContent = user;
        name.classList.add('mod__player');
        players.append(name);
    }

    // DECOMPOSES A STRING SEPARATED BY :: INTO AN OBJECT WITH first AND second
    function decompose(string){
        var index = string.indexOf('::');
        var first = string.substring(0, index);
        var second = string.substring(index + 2, string.length);
        return {first: first, second: second};
    }

    window.onload = init;

})(window);
