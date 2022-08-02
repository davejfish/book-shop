const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of books', async () => {
    const response = await request(app).get('/books');
    expect(response.body[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      released: expect.any(Number),
    });
  });

  it('should return a book with author detail', async () => {
    const response = await request(app).get('/books/1');
    const excellentBook = response.body.find(book => book.id = '1');
    expect(excellentBook).toHaveProperty('title', 'excellent book');
    expect(excellentBook).toHaveProperty('released', 1980);
    expect(excellentBook).toHaveProperty('authors');
    expect(excellentBook).books[0].toHaveProperty('name', 'bill');
    expect(excellentBook).books[0].toHaveProperty('dob', '1970-04-25');
    expect(excellentBook).books[0].toHaveProperty('pob', 'california');
  });

  afterAll(() => {
    pool.end();
  });
});
