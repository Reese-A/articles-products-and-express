const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3000;
const app = express();


app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'app'
}));
app.set('view engine', '.hbs');

app.use(express.static('/public'));

app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({
  extended: true
}));


app.use('/', routes);

app.listen(PORT, (err) => {
  console.log(`Server running on port: ${PORT}`)
});