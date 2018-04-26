const express = require('express');
const router = express.Router();
const exphbs = require('express-handlebars');
const app = express();
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');
const articleDb = require('../../db/articles');

router.route('/')
  .get((res, req) => {
    res.send(articleDb.all(res, req));
  })

module.exports = router;