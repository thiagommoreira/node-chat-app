const path = require('path');
const hbs = require('hbs');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const user = require('./user');
let users = user.users;

const PORT = process.env.PORT || 3000;
const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

let messages = [];

io.on('connection', (socket) => {

    console.log('New user connected');
//console.log(socket);
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat'));

    socket.broadcast.emit('newMessage',  generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
      io.emit('newMessage', generateMessage(message.from, message.text));
      console.log(message);
      callback('This is from the server');

    });

    socket.on('createLocationMessage', (coords) => {
      io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
   });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
//hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine', 'hbs');

app.use(express.static(publicPath));

server.listen(PORT, () => {
  console.log(`Port ${PORT} is where the magic happens.`);
});
