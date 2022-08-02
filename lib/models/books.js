const pool = require('../utils/pool');

class Book {
  id;
  title;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
    this.authors = 
    // console.log('books row.authors: ', row.authors);
    // console.log('books row.authors length: ', row.authors.length);
    row.authors ?? [];
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

  static async insert({ title, released }) {
    const { rows } = await pool.query(`
      INSERT INTO books
      (title, released) VALUES
      ($1, $2)
      RETURNING *`, [title, released]);
    return new Book(rows[0]);
  }
}

module.exports = Book;
