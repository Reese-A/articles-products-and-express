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
      let invalidProduct = productDb.create(req.body)
      productDb.delete(parseFloat(invalidProduct.id))
      res.render('newProductForm', invalidProduct)
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
    let productId = parseFloat(req.params.id);
    if (validation(req, res)) {
      console.log(req.body);
      
      res.render('product', productDb.edit(req.body, productId));
    }else{
      res.render('editProductForm', productDb.edit(req.body, productId))
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
  if (isNaN(priceNum) && isNaN(inventoryNum)){
    req.body.invalidPrice = true;
    req.body.invalidInventory = true;
    return false;
  }
  if (isNaN(priceNum)) {
    req.body.invalidPrice = true;
    return false;
  }
  if (isNaN(inventoryNum)) {
    req.body.invalidInventory = true;
    return false;
  }
  return true;
}

// .replace(/\D/g, '')
module.exports = router;