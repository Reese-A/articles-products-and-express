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

  .post((req, res) =>{
    console.log(req.body);
    return knex('products')
    .insert(req.body)
    .then((data)=>{
      return res.redirect('/products')
    })
    .catch((err) =>{
      return res.status(400).render('400');
    })
  })


router.route('/new')
  .get((req,res) => {
    return res.render('newProductForm')
  });


router.route('/:id')
  .get((req, res) => {
    const productId = req.params.id;
    return knex('products')
      .where({
        id: productId
      }).select()
      .then((data)=>{
        if(data.length === 0){
          return res.status(404).render('404');
        }
        return res.render('product', data[0]);
      })
      .catch((err)=>{
        return res.json({
          'message': 'ERROR'
        })
      });
  })

module.exports = router;