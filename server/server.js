const path = require('path');
const hbs = require('hbs');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const user = require('./user');
let users = user.users;

const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

let messages = [];

io.on('connection', (socket) => {

    console.log('New user connected');
    console.log(socket);
    socket.emit('newMessage', {
      from: 'Admin',
      text: 'Welcome to the chat',
      createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
      from: 'Admin',
      text: 'New user joined',
      createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {

      console.log(message);
      // io.emit('newMessage', {
      //   from: message.from,
      //   text: message.text,
      //   createdAt: new Date().getTime()
      // });

      socket.broadcast.emit('newMessage', {
        from: message.from,
        text: message.text,
        createdAt: new Date().getTime()
      });

    });

    socket.on('listUsers', () => {
      socket.emit('users', {
        users
      });
    });

    //console.log('filtrando funcionando');

  // socket.on('createEmail', (newEmail) => {
  //   console.log(newEmail);
  // });

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
