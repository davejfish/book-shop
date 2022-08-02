const { Router } = require('express');
const Book = require('../models/books');
const router = Router();

router
  .get('/:id', async (req, res) => {
    const response = await Book.getByID(req.params.id);
    console.log('response: ', response);
    res.json(response);
  })
  .get('/', async (req, res) => {
    const response = await Book.getAll();
    res.json(response);
  });

module.exports = router;
