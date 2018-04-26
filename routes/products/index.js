const express = require('express');
const router = express.Router();
const productDb = require('../../db/products');

router.route('/')
  .get((res, req) => {
    req.send('smoke test');
  })

module.exports = router;