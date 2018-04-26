const express = require('express');
const router = express.Router();
const exphbs = require('express-handlebars');
const app = express();
const checkData = require('../../util/checkData');
app.engine('.hbs', exphbs({
  extname: '.hbs'
}));
app.set('view engine', '.hbs');
const productDb = require('../../db/products');

const products = productDb.all()

router.use(checkData());

router.route('/')
.get((req, res) => {
  res.render('productsList', {
    products: products
  })
});

router.route('/')
.post((req,res)=>{
  const data = req.body;
  productDb.create(data);
  res.render('productsList', {
    products: products
  })
})


router.route('/new')
.get((req, res) => {
  res.render('newProductForm')
})

router.route('/:id')
  .get((req, res) => {
    let productId = req.params.id;
    const product = productDb.all()[productId];
    res.render('product', product);
  })



module.exports = router;