const path = require('path');
const hbs = require('hbs');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected');

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
