const express = require("express");
const { connectToDb, getDb } = require("./db");
const booksRouter = require("./routes/api/books");
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

let db;

connectToDb((err) => {
  if (!err) {
    app.listen(PORT, () => {
      console.log(`Sever started on port: ${PORT}`);
      console.log(`CONNECTION STRING: ${process.env.CONNECTION_STRING}`);
    });
    db = getDb();
  }
});

//routes
app.use("/api/books", booksRouter);
