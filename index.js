const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors');
require('dotenv').config();
require('./config/dbconnection');

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/workshop', require('./routes/workshop'));

app.get('/android', (req, res) => { res.redirect('/workshop')});

app.listen(process.env.PORT, (err) => {
   if(err) {
       console.log("Error in running server");
       return;
   }
   console.log(`Server is up and running on http://localhost:${process.env.PORT}`);
});