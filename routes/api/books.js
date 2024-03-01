const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getDb } = require("../../db");
const {
  bookStoreService,
  booksRetrievalServiceAll,
  booksRetrievalServiceSingle,
  booksUpdateService,
  booksRetrievalServiceSingleByTitle,
  booksRemovalService,
} = require("../../services/bookService");

router.get("/", async (req, res) => {
  try {
    const db = getDb();
    const books = await booksRetrievalServiceAll();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not fetch books" });
  }
});

router.get("/:id", async (req, res) => {
  const db = getDb();

  if (ObjectId.isValid(req.params.id)) {
    const doc = await booksRetrievalServiceSingle(req.params.id);

    if (doc) {
      res.status(200).json(doc);
    } else {
      res.status(404).json({ error: "could not find book" });
    }
  } else {
    res.status(500).json({ error: "invalid book id" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, author, price } = req.body;
    const db = getDb();

    // start validation
    if (!title || !author || !price) {
      return res.status(400).json({
        message: "Please provide all required fields: title, author, price",
      });
    }
    // end validation

    // Duplication check
    const existingBook = await booksRetrievalServiceSingleByTitle(title);
    if (existingBook) {
      return res
        .status(409)
        .json({ message: "Book with same title already exists" });
    }

    // Create new book
    const newBook = {
      title,
      author,
      price,
    };

    const result = await bookStoreService(newBook);

    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  const db = getDb();

  const updates = req.body;

  // validate ID
  if (ObjectId.isValid(req.params.id)) {
    const result = await booksUpdateService(req.params.id, updates);

    if (result.modifiedCount === 1) {
      res.status(200).json(result);
    } else {
      res.status(500).json({ error: "Failed to update" });
    }
  } else {
    res.status(500).json({ error: "invalid book id" });
  }
});

router.delete("/:id", async (req, res) => {
  const db = getDb();

  // validate ID
  if (ObjectId.isValid(req.params.id)) {
    const result = await booksRemovalService(req.params.id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(500).json({ error: "invalid book id" });
  }
});

module.exports = router;
