const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, "Book must be atleast 3 characters long"],
  },
  author: {
    type: String,
    required: true,
    minlength: [3, "Book must be atleast 3 characters long"],
  },
  price: {
    type: Number,
    required: true,
    min: [1, "Price must be atleast a dollar"],
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;

