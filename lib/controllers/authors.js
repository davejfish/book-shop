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
  })
  .post('/', async (req, res) => {
    const author = await Author.insert(req.body);
    // eslint-disable-next-line no-console
    console.log('for a push!');
    res.json(author);
  });

module.exports = router;
