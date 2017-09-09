(function(window){
    function init(){
        document.querySelector('.mod__connect').addEventListener('click', function(){
            var value = document.querySelector('.mod__game-id').value;
            if (value != '') {
                window.location.href += '?id=' + value;
            }
        });

        document.querySelector('.mod__create').addEventListener('click', function(){
            window.location.href += 'create';
        });
    }

    window.onload = init;

})(window);
