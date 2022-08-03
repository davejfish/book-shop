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
      released: expect.any(String),
    });
  });

  it('should return a book with author detail', async () => {
    const response = await request(app).get('/books/1');
    const excellentBook = response.body;
    expect(excellentBook).toHaveProperty('title', 'excellent book');
    expect(excellentBook).toHaveProperty('released', '1980');
    expect(excellentBook).toHaveProperty('authors');
    expect(excellentBook.authors[0]).toHaveProperty('name', 'bill');
    expect(excellentBook.authors[0]).toHaveProperty('dob', '4/25/1970');
    expect(excellentBook.authors[0]).toHaveProperty('pob', 'california');
  });

  it('#POST should add a new book', async () => {
    const response = await request(app)
      .post('/books')
      .send({
        title: 'super book',
        released: '2022',
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      released: expect.any(String),
    });
  });

  afterAll(() => {
    pool.end();
  });
});
