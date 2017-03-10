// shorthand for $(document).ready(...)
$(function() {
    var socket = io();
    var nickname;
    
    $('form').submit(function(){
	   socket.emit('chat', { message: $('#m').val()});
	   $('#m').val('');
	   return false;
    });

    socket.on('chat', function(msg){
        var hexcolor = msg.userInfo.nameColour;
        // messages sent by user is bolded, otherwise regular style
        if(msg.userInfo.clientKey === socket.io.engine.id){
            $('#messages').append($('<li>').html(msg.time + "  ||  <b><font color=\"" + hexcolor + "\">" + msg.userInfo.nickname 
                                                 + "</font>: " + msg.message + "</b>"));
        }
        else{
            $('#messages').append($('<li>').html(msg.time + "  ||  <b><font color=\"" + hexcolor + "\">" + msg.userInfo.nickname + "</b>: " + msg.message));
        }
    });
    
    socket.on('notice', function(msg){
	   $('#messages').append($('<li>').html(msg.time + "  ||  " + '<i>' + msg.chatNotice + '</i>'));
    });
    
    socket.on('nickname', function(msg){
	   $('#messages').append($('<li>').html('<b><i>' + msg.nickname + '</b></i>'));
        //nickname = msg.nickname.slice(-6);
    });
});