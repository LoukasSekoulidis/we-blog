const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello');
})

router.get('/json', (req, res) => {
  res.json({ name: 'Lukas' });
})

module.exports = router;