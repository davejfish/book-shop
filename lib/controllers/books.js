const { Router } = require('express');
const Book = require('../models/books');
const { convertAuthors } = require('../models/constructor');
const router = Router();

router
  .get('/:id', async (req, res) => {
    const response = await Book.getByID(req.params.id);
    if(response.authors) {
      response.authors = convertAuthors(response.authors);
    }
    res.json(response);
  })
  .get('/', async (req, res) => {
    const response = await Book.getAll();
    if(response.authors) {
      response.authors = convertAuthors(response.authors);
    }
    res.json(response);
  })
  .post('/', async (req, res) => {
    const book = await Book.insert(req.body);
    res.json(book);
  });

module.exports = router;
