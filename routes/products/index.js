const express = require('express');
const router = express.Router();
const knex = require('../../db/knex.js');

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
        return res.json({
          'message': 'ERROR'
        })
      });
  })

  .post((req, res) => {
    console.log(req.body);
    return knex('products')
      .insert(req.body)
      .then((data) => {
        return res.redirect('/products')
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).render('400');
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
          return res.status(404).render('404');
        }
        return res.render('product', data[0]);
      })
      .catch((err) => {
        return res.json({
          'message': 'ERROR'
        })
      });
  })

  .put((req, res) => {
    const productId = req.params.id;
    const updatedProd = req.body;
    return knex('products')
      .update(updatedProd).where('id', productId)
      .returning('*')
      .then((data) => {
        console.log(data);
        if(data.length === 0){
          return res.status(400).render('400');
        }
        return res.redirect(`/products/${productId}`)
      })
      .catch((err)=>{
        console.log('PUT ERROR', err);
        return res.status(400).render('400');
      });
  })

  .delete((req,res)=>{
    const productId = req.params.id;
    return knex('products')
    .delete().where('id', productId)
    .returning('*')
    .then((data)=>{
      console.log(data);
      if(!data){
        return res.status(400).render('400');
      }
      return res.redirect('/products');
    })
    .catch((err)=>{
      console.log('DELETE ERROR', err);
      return res.status(400).render('400');
    })
  })


router.route('/:id/edit')
  .get((req, res) => {
    const productId = req.params.id;
    return knex('products')
      .select().where('id', productId)
      .then((data) => {
        return res.render('editProductForm', data[0])
      })
      .catch((err) => {
        return res.json({
          'message': 'ERROR'
        });
      });
  });


module.exports = router;