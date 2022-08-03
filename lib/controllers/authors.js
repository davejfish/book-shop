const { Router } = require('express');
const Author = require('../models/authors');
const { convertBooks } = require('../models/constructor');
const router = Router();

router
  .get('/:id', async (req, res) => {
    const response = await Author.getByID(req.params.id);
    if(response.books) {
      response.books = convertBooks(response.books);
    }
    res.json(response);
  })
  .get('/', async (req, res) => {
    const response = await Author.getAll();
    if(response.books) {
      response.books = convertBooks(response.books);
    }
    res.json(response);
  })
  .post('/', async (req, res) => {
    const author = await Author.insert(req.body);
    res.json(author);
  });

module.exports = router;
