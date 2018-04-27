const express = require('express');
const router = express.Router();
// const exphbs = require('express-handlebars');
// const app = express();
// const methodOverride = require('method-override');
// app.use(methodOverride('_method'))
const checkData = require('../../util/checkData');
// app.engine('.hbs', exphbs({
//   extname: '.hbs'
// }));
// app.set('view engine', '.hbs');
const productDb = require('../../db/products');

const products = productDb.all()

router.use(checkData());


router.route('/')
  .get((req, res) => {
    res.render('productsList', {
      products: products
    })
  })

  .post((req, res) => {
    if (validation(req, res)) {
      const data = req.body;
      productDb.create(data);
      res.render('productsList', {
        products: products
      })
    } else {
      res.send('NaN');
    }
  })


router.route('/new')
  .get((req, res) => {
    res.render('newProductForm')
  })


router.route('/:id')
  .get((req, res) => {
    let productId = parseFloat(req.params.id);
    const product = productDb.getById(productId);
    res.render('product', product);
  })

  .put((req, res) => {
    if (validation(req, res)) {
      let productId = parseFloat(req.params.id);
      const data = req.body;
      const editedProduct = productDb.edit(data, productId);
      res.render('product', editedProduct);
    } else {
      res.send('NaN');
    }
  })

  .delete((req, res) => {
    let productId = parseFloat(req.params.id);
    productDb.delete(productId);
    res.render('productsList', {
      products: products
    });
  })


router.route('/:id/edit')
  .get((req, res) => {
    let productId = parseFloat(req.params.id);
    const product = productDb.getById(productId);
    res.render('editProductForm', product);
  })

function validation(req, res) {
  let priceNum = Number(req.body.price);
  let inventoryNum = Number(req.body.inventory);
  if (Number.isNaN(priceNum)) return false;
  if (Number.isNaN(inventoryNum)) return false;
  return true;
}

// .replace(/\D/g, '')
module.exports = router;