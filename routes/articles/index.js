const express = require('express');
const router = express.Router();
// const exphbs = require('express-handlebars');
// const app = express();
// app.engine('.hbs', exphbs({ extname: '.hbs' }));
// app.set('view engine', '.hbs');
const checkData = require('../../util/checkData');
const articleDb = require('../../db/articles');

const articles = articleDb.all()

router.use(checkData());


router.route('/')
  .get((req, res) => {
    res.render('articlesList', {
      articles: articles
    })
  })

module.exports = router;