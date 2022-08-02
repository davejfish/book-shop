const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  // it('should return a list of authors', async () => {
  //   const response = await request(app).get('/authors');
  //   expect(response.body.length).toEqual(4);
  // });

  // it('should return an author with a detail of books written', async () => {
  //   const response = await request(app).get('/authors/1');
  //   const bob = response.body.find(author => author.id === '1');
  //   expect(bob).toHaveProperty('name', 'bob');
  //   expect(bob).toHaveProperty('dob', '1900-05-05');
  //   expect(bob).toHaveProperty('pob', 'over there');
  //   expect(bob).toHaveProperty('books');
  //   expect(bob).books[0].toHaveProperty('title');
  //   expect(bob).books[0].toHaveProperty('released');
  // });

  afterAll(() => {
    pool.end();
  });
});
