var socket = io();

socket.on('connect', function() {
  console.log('connected to server');

});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('users', function(u) {
  console.log(u);
});

socket.on('welcomeMessage', function(m) {
  console.log(m);
});

socket.on('newUser', function(u) {
  console.log(u);
})

socket.on('newMessage', function(m) {
  console.log(`New message from ${m.from} at ${m.createdAt} is ${m.text}`);
});
