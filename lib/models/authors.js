const pool = require('../utils/pool');
const Book = require('./books');
const { BookAuthor } = require('./books_to_authors');

class Author {
  id;
  name;
  dob;
  pob;
  books;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = row.dob;
    this.pob = row.pob;
    this.books = 
      console.log('row.books: ', row.books);
    row.books.length > 0 ? row.books.map((books) => new BookAuthor(books)) : [];
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * FROM authors`
    );
    return rows.map(row => new Author(row));
  }

  static async getByID(id) {
    const { rows } = await pool.query(`
      SELECT 
      authors.*, 
      COALESCE(
        json_agg(to_jsonb(books))
        FILTER (WHERE books_to_authors.id IS NOT NULL), '[]'
    ) as books 
    FROM authors
    LEFT JOIN books_to_authors on authors.id = books_to_authors.author_id
    LEFT JOIN books on books.id = books_to_authors.book_id
    WHERE authors.id = $1
    GROUP BY authors.id`, [id]);

    return new Author(rows[0]);
  }
}

module.exports = { Author };
