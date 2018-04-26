const express = require('express');
const router = express.Router();
const productDb = require('../db/products');

router.route('/products')
  .get((res, req) => {
    res.send(productDb.all(res, req));
  })

module.exports = router;