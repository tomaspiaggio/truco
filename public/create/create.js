(function(window){
    function init(){
        var user = localStorage.getItem('user');
        if(user) addUser(decompose(user));
        else askForName();
    }

    // TODO: FALTA TERMINAR ESTO
    function askForName(){
        document.querySelector('.mod__request-name').classList.add('mod__request-name--active');
    }

    function addUser(user){

    }

    function decompose(string){
        var index = string.indexOf('::');
        var first = string.substring(0, index);
        var second = string.substring(index + 2, string.length);
        return {first: first, second: second};
    }

    window.onload = init;

})(window);
