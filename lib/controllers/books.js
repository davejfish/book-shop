const { Router } = require('express');
const Book = require('../models/books');
const router = Router();

router
  .get('/:id', async (req, res) => {
    const response = await Book.getByID(req.params.id);
    res.json(response);
  })
  .get('/', async (req, res) => {
    const response = await Book.getAll();
    res.json(response);
  })
  .post('/', async (req, res) => {
    const book = await Book.insert(req.body);
    res.json(book);
  });

module.exports = router;
