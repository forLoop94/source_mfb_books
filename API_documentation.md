# 📗 Source MFB's Bookstore API Documentation

This documentation outlines the endpoints and usage for a basic Bookstore API. The API allows users to perform CRUD (Create, Read, Update, Delete) operations on a collection of books.

## API Base URL

The base URL for the API is https://localhost:5000/api.

## Authentication

The API does not require any form of authentication.

## Error Handling

- For invalid requests, the API returns appropriate HTTP status codes and error messages.
- For unexpected errors, the API returns a generic error message and an HTTP status code of 500 (Internal Server Error).

## Endpoints

### 1. GET /books
Retrieve a list of all books

Request:

```sh
GET /books
```

Response:

```sh
Status Code: 200 OK

[
  {
    "id": 1,
    "title": "Book 1",
    "author": "Author 1",
    "price": 19.99
  },
  {
    "id": 2,
    "title": "Book 2",
    "author": "Author 2",
    "price": 24.99
  },
  ...
]
```

### 2. GET /books/:id

Retrieve a specific book by its ID

Request:

```sh
GET /books/1
```

Response:

```sh
Status Code: 200 OK

{
  "id": 1,
  "title": "Book 1",
  "author": "Author 1",
  "price": 19.99
}
```

### 3. POST /books

Create a new book.

Request:

```sh
POST /books
```

Body:

```sh
{
  "title": "New Book",
  "author": "New Author",
  "price": 29.99
}
```

Response:

```sh
Status Code: 201 Created

{
  "id": 3,
  "title": "New Book",
  "author": "New Author",
  "price": 29.99
}
```

### 4. PUT /books/:id

Update an existing book.

Request:

```sh
PUT /books/1
```

Body:

```sh
{
  "title": "Updated Book Title",
  "author": "Updated Author",
  "price": 34.99
}

```

Response:

```sh
Status Code: 200 OK

{
  "id": 1,
  "title": "Updated Book Title",
  "author": "Updated Author",
  "price": 34.99
}
```

### 5. DELETE /books/:id

Delete a book by its ID.

Request:

```sh
DELETE /books/1
```

Response:

```sh
Status Code: 200 OK

{
  "id": 1,
  "title": "Book 1",
  "author": "Author 1",
  "price": 19.99
}
```


## Conclusion

The Bookstore API provides a simple yet powerful way to manage a collection of books. With proper error handling and appropriate HTTP status codes, it ensures a smooth and reliable experience for users interacting with the API.
