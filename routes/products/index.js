const express = require('express');
const router = express.Router();
const checkData = require('../../util/checkData');
const productDb = require('../../db/products');


router.use(checkData());

router.route('/')
  .get((req, res) => {
    const products = productDb.all()
    res.render('productsList', {
      products: products
    })
  })

  .post((req, res) => {
    if (validation(req, res)) {
      const products = productDb.all()
      const data = req.body;
      productDb.create(data);
      res.redirect('/products')
    } else {
      let invalidProduct = productDb.create(req.body)
      res.render('newProductForm', invalidProduct)
      productDb.delete(parseFloat(invalidProduct.id))
    }
  })


router.route('/new')
  .get((req, res) => {
    res.render('newProductForm')
  })


router.route('/:id')
  .get((req, res) => {
    let productId = parseInt(req.params.id);
    const product = productDb.getById(productId);
    res.render('product', product);
  })

  .put((req, res) => {
    let productId = parseInt(req.params.id);
    if (validation(req, res)) {
      console.log(req.body);
      let edited = productDb.edit(req.body, productId);
      res.redirect(`/products/${edited.id}`);
    } else {
      res.render('editProductForm', productDb.edit(req.body, productId))
    }
  })

  .delete((req, res) => {
    let productId = parseInt(req.params.id);
    const products = productDb.delete(productId);
    res.render('productsList', {
      products: products
    });
  })


router.route('/:id/edit')
  .get((req, res) => {
    let productId = parseInt(req.params.id);
    const product = productDb.getById(productId);
    res.render('editProductForm', product);
  })

function validation(req, res) {
  let priceNum = Number(req.body.price);
  let inventoryNum = Number(req.body.inventory);
  if (isNaN(priceNum) && isNaN(inventoryNum)) {
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