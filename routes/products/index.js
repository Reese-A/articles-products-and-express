const express = require('express');
const router = express.Router();
const knex = require('../../db/knex.js');
const errors = require('../../errors');


router.route('/')
  .get((req, res) => {
    return knex
      .select().table('products')
      .then((data) => {
        return res.render('productsList', {
          products: data
        })
      })
      .catch((err) => {
        console.log('GET PRODUCTS LIST', err);
        return res.status(500).render('error', errors.serverErr);
      });
  })

  .post((req, res) => {
    console.log(req.body);
    return knex('products')
      .insert(req.body)
      .then((data) => {
        return res.status(200).redirect('/products')
      })
      .catch((err) => {
        console.log('POST NEW PRODUCT', err.name);
        if(err.message.includes('invalid input syntax')){
        return res.status(400).render('error', errors.badRequest);
        }
        return res.status(500).render('error', errors.serverErr);
      })
  })


router.route('/new')
  .get((req, res) => {
    return res.render('newProductForm')
  });


router.route('/:id')
  .get((req, res) => {
    const productId = req.params.id;
    return knex('products')
      .select().where('id', productId)
      .then((data) => {
        if (data.length === 0) {
          throw new Error('ERROR 404 NOT FOUND');
        }
        return res.render('product', data[0]);
      })
      .catch((err) => {
        console.log(err);
        if (err.message === errors.notFound.message) {
          return res.status(404).render('error', errors.notFound);
        }
        return res.status(500).render('error', errors.serverErr);
      });
  })

  .put((req, res) => {
    const productId = req.params.id;
    const updatedProd = req.body;
    return knex('products')
      .update(updatedProd).where('id', productId)
      .returning('*')
      .then((data) => {
        if (data.length === 0) {
          throw new Error('ERROR 404 NOT FOUND')
        }
        return res.redirect(`/products/${productId}`)
      })
      .catch((err) => {
        console.log('PUT ERROR', err);
        if(err.message === errors.notFound.message){
        return res.status(404).render('error', errors.notFound);
        }
        if (err.message.includes('invalid input syntax')) {
          return res.status(400).render('error', errors.badRequest);
        }
        return res.status(500).render('error', errors.serverErr);
      });
  })

  .delete((req, res) => {
    const productId = req.params.id;
    return knex('products')
      .delete().where('id', productId)
      .returning('*')
      .then((data) => {
        console.log(data);
        if (data.length === 0) {
          throw new Error('ERROR 404 NOT FOUND')
        }
        return res.status(200).redirect('/products');
      })
      .catch((err) => {
        console.log('DELETE', err);
        if (err.message === errors.notFound.message) {
          return res.status(404).render('error', errors.notFound);
        }
        return res.status(500).render('error', errors.serverErr);
      })
  })


router.route('/:id/edit')
  .get((req, res) => {
    const productId = req.params.id;
    return knex('products')
      .select().where('id', productId)
      .then((data) => {
        if(data.length === 0){
          throw new Error('ERROR 404 NOT FOUND');
        }
        return res.render('editProductForm', data[0])
      })
      .catch((err) => {
        console.log('GET EDIT PAGE', err);
        if (err.message === errors.notFound.message) {
          return res.status(404).render('error', errors.notFound);
        }
        return res.status(500).render('error', errors.serverErr);
      });
  });


module.exports = router;