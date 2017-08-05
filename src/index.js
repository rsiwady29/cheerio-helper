$(document).ready(function () {
    var socket = io();
    $('form').submit(function() {
        socket.emit('eval', $('#code').val());
        return false;
    });

    var typingTimer;
    var doneTypingInterval = 800;
    function doneTyping () {
        console.log('done');
        socket.emit('eval', $('#code>pre').text());
    }

    setTimeout(function() {
        $('#code>textarea').keyup(function(){
            clearTimeout(typingTimer);
            if ($('#code>pre').text()) {
                typingTimer = setTimeout(doneTyping, doneTypingInterval);
            }
        });
    }, 100);

    $('#html').change(function() {
        socket.emit('htmlUpdate', $('#html').val());
    });

    socket.on('result', function(result) {
        $('#result').text(JSON.stringify(result, null, 2));
    });

    var flask = new CodeFlask;
    flask.run('#code', {
        language: 'javascript',
        lineNumbers: true
    });
});
