const pool = require('../utils/pool');

class Author {
  id;
  name;
  dob;
  pob;
  books;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = new Date(row.dob).toLocaleDateString('en-US');
    this.pob = row.pob;
    this.books = 
      row.books ?? [];
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

  static async insert({ name, dob, pob }) {
    const { rows } = await pool.query(`
      INSERT INTO authors 
      (name, dob, pob) VALUES
      ($1, $2, $3)
      RETURNING *`, [name, dob, pob]);
    return new Author(rows[0]);
  }
}

module.exports = Author;
