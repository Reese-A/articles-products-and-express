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

  .post((req,res)=>{
    const data = req.body;
    articleDb.create(data);
    res.render('articlesList', {articles: articles});
  })

router.route('/new')
  .get((req, res) => {
    res.render('newArticleForm')
  })

router.route('/:title')
  .get((req, res) => {
    let titleUrl = req.params.title;
    const article = articleDb.getByTitle(titleUrl)
    res.render('article', article);
  })

module.exports = router;