const express = require('express');
const articles = require('./articles');
const products = require('./products');
const knex = require('../db/knex.js');

const router = express.Router();

router.use('/articles', articles);
router.use('/products', products);

module.exports = router;