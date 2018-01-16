const path = require('path');
const hbs = require('hbs');
const express = require('express');

const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

let app = express();
//hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine', 'hbs');

app.use(express.static(publicPath));


app.listen(PORT, () => {
  console.log(`Port ${PORT} is where the magic happens.`);
});
