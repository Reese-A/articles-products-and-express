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

  .post((req, res) => {
    if (validation(req, res)) {
      articleDb.create(req.body);
      res.render('articlesList', {
        articles: articles
      })
    } else {
      let invalidArticle = articleDb.getByTitle(req.body.title);
      res.render('newArticleForm', invalidArticle);
    }
  })


router.route('/new')
  .get((req, res) => {
    res.render('newArticleForm')
  })


router.route('/:title')
  .get((req, res) => {
    let reqTitle = req.params.title;
    const article = articleDb.getByTitle(reqTitle)
    res.render('article', article);
  })

  .put((req, res) => {
    let reqTitle = req.params.title;
    if (validation(req, res)) {
      res.render('article', articleDb.edit(req.body, reqTitle));
    } else {
      res.render('editArticleForm', articleDb.edit(req.body, reqTitle))
    }
  })

  .delete((req, res) => {
    let reqTitle = req.params.title;
    articleDb.delete(reqTitle);
    res.render('articlesList', {
      articles: articles
    });
  })

router.route('/:title/edit')
  .get((req, res) => {
    let reqTitle = req.params.title;
    const article = articleDb.getByTitle(reqTitle);
    res.render('editArticleForm', article);
  })

function validation(req, res) {
  let titleCheck = articleDb.getByTitle(req.body.title);
  let decodeUrl = decodeURI(req.url);
  let uri = decodeUrl.split('/')[1].split('?')[0];
  if (titleCheck) {
    if (titleCheck.title === uri) {
      req.body.invalidTitle = false;
      return true;
    }
    req.body.invalidTitle = true;
    return false
  }
  req.body.invalidTitle = false;
  return true;
}

module.exports = router;