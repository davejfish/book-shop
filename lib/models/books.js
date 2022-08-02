const pool = require('../utils/pool');
const { Author } = require('./authors');
const { BookAuthor } = require('./books_to_authors');


class Book {
  id;
  title;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
    this.authors = 
    console.log('books row.authors: ', row.authors);
    console.log('books row.authors length: ', row.authors.length);
    row.authors.length > 0 ? row.authors.map(authors => new BookAuthor(authors)) : [];
  }

  static async getByID(id) {
    const { rows } = await pool.query(`
      SELECT 
      books.*, 
      COALESCE(
        json_agg(to_jsonb(authors))
        FILTER (WHERE books_to_authors.id IS NOT NULL), '[]'
    ) as authors 
    from books
    LEFT JOIN books_to_authors on books.id = books_to_authors.book_id
    LEFT JOIN authors on authors.id = books_to_authors.author_id
    WHERE books.id = $1
    GROUP BY books.id`, [id]);
    
    // console.log('new book: ', new Book(rows[0]));
    return new Book(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT * FROM books
    `);

    return rows.map(row => new Book(row));
  }
}

module.exports = Book;
