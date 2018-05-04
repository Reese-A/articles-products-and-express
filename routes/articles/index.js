const express = require('express');
const router = express.Router();
const checkData = require('../../util/checkData');
const articleDb = require('../../db/articles');

router.use(checkData());


router.route('/')
  .get((req, res) => {
    const articles = articleDb.all()
    res.render('articlesList', {
      articles: articles
    })
  })

  .post((req, res) => {
    if (postValidation(req, res)) {
      const articles = articleDb.all()
      articleDb.create(req.body);
      res.render('articlesList', {
        articles: articles
      })
    } else {
      req.body.title += '*';
      let invalidArticle = articleDb.create(req.body);
      articleDb.delete(invalidArticle.title);
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
    if (putValidation(req)) {
      let edited = articleDb.edit(req.body, reqTitle)
      res.redirect(`/articles/${edited.urlTitle}`)
    } else {
      req.body.urlTitle = encodeURI(req.params.title);
      res.render('editArticleForm', req.body)
    }
  })

  .delete((req, res) => {
    let reqTitle = req.params.title;
    const articles = articleDb.delete(reqTitle);
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

function postValidation(req) {
  let titleCheck = articleDb.getByTitle(req.body.title);
  if (titleCheck) {
    req.body.invalidTitle = true;
    return false;
  }
  req.body.invalidTitle = false;
  return true
}

function putValidation(req) {
  let titleCheck = articleDb.getByTitle(req.body.title);
  let decodeUrl = decodeURI(req.url);
  let uri = decodeUrl.split('/')[1].split('?')[0];
  if (titleCheck) {
    if (titleCheck.title === uri) {
      req.body.invalidTitle = false;
      return true;
    }
    req.body.invalidTitle = true;
    return false;
  }
  req.body.invalidTitle = false;
  return true
}


module.exports = router;