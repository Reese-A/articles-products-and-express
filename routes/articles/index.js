const express = require('express');
const router = express.Router();
const articleDb = require('../../db/articles');

router.route('/')
  .get((res, req) => {
    res.send(articleDb.all(res, req));
  })

module.exports = router;