const express = require('express');
const router = express.Router();
const exphbs = require('express-handlebars');
const app = express();
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');
const productDb = require('../../db/products');

router.route('/')
  .get((req, res) => {
    res.render('productsList', productDb.all())
  });



module.exports = router;