const Book = require('../models/bookModel');

exports.bookStoreService = async (book) => {
  return await Book.create(book);
};

exports.booksRetrievalAndPaginationService = async (req) => {
  // Pagination for large datasets
  const page = req.query.p || 0;
  const booksPerPage = 3
  return await Book.find().skip(page * booksPerPage).limit(booksPerPage);
};

exports.booksRetrievalServiceSingle = async (id) => {
  return await Book.findById(id);
};

exports.booksUpdateService = async (id, updates) => {
  return await Book.findByIdAndUpdate(id, updates, { new: true });
};

exports.booksRemovalService = async (id) => {
  return await Book.findByIdAndDelete(id);
};

exports.booksRetrievalServiceSingleByTitle = async (title) => {
  return await Book.findOne({ title });
};

