const path = require('path');
const hbs = require('hbs');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 3000;

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
var users = new Users();

let messages = [];

app.use(express.static(publicPath));

io.on('connection', (socket) => {

  console.log('New user connected');
  //console.log(socket);
  //socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat'));

  //socket.broadcast.emit('newMessage',  generateMessage('Admin', 'New user joined'));

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined.`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {

    var user = users.getUser(socket.id);

    if(user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    //console.log(message);
    callback('This is from the server');

  });

  socket.on('createLocationMessage', (coords) => {
    let user = users.getUser(socket.id);

    if(user) {
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }


  });

  socket.on('disconnect', () => {
    //console.log(socket.id);
    var user = users.removeUser(socket.id);
    // console.log(user.room);
    // console.log('userlist', users.getUserList(user.room));

    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} has left.`));
    }
  });
});
//hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine', 'hbs');


server.listen(PORT, () => {
  console.log(`Port ${PORT} is where the magic happens.`);
});
