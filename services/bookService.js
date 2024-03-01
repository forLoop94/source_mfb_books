const { ObjectId } = require("mongodb");
const { getDb } = require("../db");

exports.bookStoreService = async (book) => {
  const db = getDb();
  return await db.collection("books").insertOne(book);
};

exports.booksRetrievalServiceAll = async () => {
  const db = getDb();
  console.log({ db });
  return await db.collection("books").find().toArray();
};

exports.booksRetrievalServiceSingle = async (id) => {
  const db = getDb();
  return await db.collection("books").findOne({ _id: new ObjectId(id) });
};

exports.booksUpdateService = async (id, updates) => {
  const db = getDb();
  return await db
    .collection("books")
    .updateOne({ _id: new ObjectId(id) }, { $set: updates });
};

exports.booksRemovalService = async (id) => {
  const db = getDb();
  return await db.collection("books").deleteOne({ _id: new ObjectId(id) });
};

exports.booksRetrievalServiceSingleByTitle = async (title) => {
  const db = getDb();
  return await db.collection("books").findOne({ title });
};
