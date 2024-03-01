const express = require('express');
const connectToDb = require('./db');
const booksRouter = require('./routes/api/books');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

connectToDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
      console.log(`CONNECTION STRING: ${process.env.CONNECTION_STRING}`);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use('/api/books', booksRouter);

