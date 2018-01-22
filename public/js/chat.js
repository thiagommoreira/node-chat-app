var socket = io();

function scrollToBottom() {
   var messages = jQuery('#messages');
   var newMessage = messages.children('li:last-child');

   var clientHeight = messages.prop('clientHeight');
   var scrollTop = messages.prop('scrollTop');
   var scrollHeight = messages.prop('scrollHeight');
   var newMessageHeight = newMessage.innerHeight();
   var lastMessageHeight = newMessage.prev().innerHeight();

   if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight);
   }
}

socket.on('connect', function() {
    console.log('connected to server');
    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function(err) {
      if(err) {
         windows.location.href = '/';
      } else {

      }
   });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(m) {
    let formattedTime = moment(m.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
      text: m.text,
      createdAT: formattedTime,
      from: m.from
    });

    jQuery('#messages').append(html);
    scrollToBottom();
    //
    // var li = jQuery('<li></li>');
    // li.text(`${formattedTime} ${m.from}: ${m.text}`);
    // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(m) {

  let formattedTime = moment(m.createdAt).format('h:mm a');
  let template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    url: m.url,
    from: m.from,
    createdAt: formattedTime
  });
  //console.log(html);
  jQuery('#messages').append(html);
  scrollToBottom();
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current Location</a>');
  // li.text(`${formattedTime} ${m.from}:`);
  // a.attr('href', m.url);
  // li.append(a);
  // jQuery('#messages').append(li);
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
