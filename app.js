const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8080;
const articleDb = require('./db/articles');
const productDb = require('./db/products');
const articles = require('./routes/articles');
const products = require('./routes/products');
app.use(express.static('./public'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', products);

app.listen(PORT, (err) => {
  console.log(`Server running on port: ${PORT}`)
});