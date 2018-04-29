const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 8080;
const exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'app'
}));
app.set('view engine', '.hbs');

app.use(methodOverride('_method'))


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(methodOverride('_method'));

app.use(express.static('./public'));

app.use('/', routes);

app.listen(PORT, (err) => {
  console.log(`Server running on port: ${PORT}`)
});