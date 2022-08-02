const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET should return a list of authors', async () => {
    const response = await request(app).get('/authors');
    expect(response.body.length).toEqual(4);
  });

  it('#GET should return an author with a detail of books written', async () => {
    const response = await request(app).get('/authors/1');
    const bob = response.body;
    expect(bob).toHaveProperty('name', 'bob');
    expect(bob).toHaveProperty('dob', '5/5/1900');
    expect(bob).toHaveProperty('pob', 'over there');
    expect(bob).toHaveProperty('books');
    expect(bob.books[0]).toHaveProperty('title');
    expect(bob.books[0]).toHaveProperty('released');
  });

  it('#POST should add a new author', async () => {
    const response = await request(app)
      .post('/authors')
      .send({
        name: 'author man',
        dob: '1850-01-01',
        pob: 'india'
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      dob: expect.any(String),
      pob: expect.any(String),
      books: expect.any(Array),
    });
  });

  afterAll(() => {
    pool.end();
  });
});
