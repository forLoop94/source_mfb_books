const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const bookService = require('../../services/bookService');
const Book = require('../../models/bookModel');

router.get('/', async (req, res) => {
  try {
    //  Business logic
    const books = await bookService.booksRetrievalAndPaginationService(req);
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch books' });
  }
});

router.get("/:id", async (req, res) => {
  // Validate ID
  if (ObjectId.isValid(req.params.id)) {
    //  Business logic
    const doc = await bookService.booksRetrievalServiceSingle(req.params.id);
    if (doc) {
      res.status(200).json(doc);
    } else {
      res.status(404).json({ error: "could not find book" });
    }
  } else {
    res.status(500).json({ error: "invalid book id" });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, author, price } = req.body;

    // start validation
    if (!title || !author || !price) {
      return res.status(400).json({
        message: "Please provide all required fields: title, author, price",
      });
    }
    // end validation

    // Duplication check
    const existingBook = await bookService.booksRetrievalServiceSingleByTitle(title);
    if (existingBook) {
      return res
        .status(409)
        .json({ message: "Book with same title already exists" });
    }

    // Create new user
    const newBook = {
      title,
      author,
      price,
    };

    //  Business logic
    await bookService.bookStoreService(newBook);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.put("/:id", async (req, res) => {
  const updates = req.body;

  // validate ID
  if (ObjectId.isValid(req.params.id)) {
    //  Business logic
    const result = await bookService.booksUpdateService(req.params.id, updates);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(500).json({ error: "Failed to update" });
    }
  } else {
    res.status(500).json({ error: "invalid book id" });
  }
});

router.delete("/:id", async (req, res) => {

  // validate ID
  if (ObjectId.isValid(req.params.id)) {
    //  Business logic
    const result = await bookService.booksRemovalService(req.params.id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(500).json({ error: "Failed to delete" });
    }
  } else {
    res.status(500).json({ error: "invalid book id" });
  }
});

module.exports = router;
