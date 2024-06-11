const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Routes = require("../routers/router");

// Load environment variables from .env file
dotenv.config({ path: '../.env' });


require('dotenv').config();

mongoose.connect(process.env.CONN_STR_ATLAS)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

app.use(cors());
app.use(express.json());
app.use("/user",Routes);
app.listen(process.env.PORT, (req, res) => {
});