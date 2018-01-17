var socket = io();

socket.on('connect', function() {
    console.log('connected to server');

});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(m) {
    console.log(`New message from ${m.from} at ${m.createdAt} is ${m.text}`);
    var li = jQuery('<li></li>');
    li.text(`${m.from}: ${m.text}`);

    jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// }, function(data) {
//     console.log("got it", data);
// });

jQuery('#message-form').on('submit', function(e) {
   e.preventDefault();

   socket.emit('createMessage', {
      from: 'User',
      text: jQuery('[name=message]').val()
   }, function() {

   });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
   if(!navigator.geolocation) {
      return alert('Geolocation not supported by your browser.')
   }

   navigator.geolocation.getCurrentPosition(function(position) {
      socket.emit('createLocationMessage', {
         latitude: position.coords.latitude,
         longitude: position.coords.longitude
      });
   }, function() {
      alert('Unable to fetch location.');
   });

});
