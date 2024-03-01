const mongoose = require('mongoose');
require('dotenv').config();

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectToDb;

