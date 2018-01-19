var socket = io();

socket.on('connect', function() {
    console.log('connected to server');

});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(m) {
    //console.log(`New message from ${m.from} at ${m.createdAt} is ${m.text}`);
    let formattedTime = moment(m.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    li.text(`${formattedTime} ${m.from}: ${m.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(m) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current Location</a>');
  let formattedTime = moment(m.createdAt).format('h:mm a');
  li.text(`${formattedTime} ${m.from}:`);
  a.attr('href', m.url);
  li.append(a);
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
     jQuery('[name=message]').val('');
   });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
   if(!navigator.geolocation) {
      return alert('Geolocation not supported by your browser.')
   }

   locationButton.attr('disabled','disabled').text('Sending Location...');

   navigator.geolocation.getCurrentPosition(function(position) {
     locationButton.removeAttr('disabled').text('Send Location');
      socket.emit('createLocationMessage', {
         latitude: position.coords.latitude,
         longitude: position.coords.longitude
      });
   }, function() {
     locationButton.removeAttr('disabled').text('Send Location');
      alert('Unable to fetch location.');
   });

});
