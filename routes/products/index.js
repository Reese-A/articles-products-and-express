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


router.route('/:id')
  .get((req, res) => {
    const productId = req.params.id;
    return knex('products')
      .where({
        id: productId
      }).select()
      .then((data)=>{
        return res.render('product', data[0]);
      })
      .catch((err)=>{
        return res.json({
          'message': 'ERROR'
        })
      });
  })

module.exports = router;