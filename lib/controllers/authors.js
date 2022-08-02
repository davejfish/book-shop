const { Router } = require('express');
const Author = require('../models/authors');
const router = Router();

router
  .get('/:id', async (req, res) => {
    const response = await Author.getByID(req.params.id);
    res.json(response);
  })
  .get('/', async (req, res) => {
    const response = await Author.getAll();
    res.json(response);
  });

module.exports = router;
