const express = require("express");
const app = express();
const cors = require('cors');
require('dotenv').config();
require('./config/dbconnection');

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false}));

app.use('/', require('./routes/index'));

app.listen(process.env.PORT, (err) => {
   if(err) {
       console.log("Error in running server");
       return;
   }
   console.log(`Server is up and running on http://localhost:${process.env.PORT}`);
});