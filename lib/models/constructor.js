const Author = require('./authors');
const Book = require('./books');


function convertBooks(books) {
  books = books.map(book => new Book(book));
  return books;
}

function convertAuthors(authors) {
  authors = authors.map(author => new Author(author));
  return authors;
}

module.exports = { convertBooks, convertAuthors };
