const express = require('express');
const router = express.Router();
const exphbs = require('express-handlebars');
const app = express();
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');
const productDb = require('../../db/products');

router.route('/')
  .get((req, res) => {
    const products = productDb.all()
    res.render('productsList', {products: products})
  });

router.route('/:id')
  .get((req, res) => {
    let productId = req.params.id;
    const product = productDb.all()[productId];
    res.render('product', product);
  })

module.exports = router;