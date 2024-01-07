const mongoose = require('mongoose');
require('dotenv').config(); // Ensure dotenv is loaded to access environment variables

const uri = process.env.DATABASE_URL; // Access the MongoDB URI from the environment variables

 const dbConnect=()=>{mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to database');
    // Further code execution or other operations can be performed here
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });}
  module.exports=dbConnect;
