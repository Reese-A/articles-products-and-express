\c articles_products articles_products_user;

DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS products;

CREATE TABLE articles
(
  id serial,
  title varchar(255) UNIQUE CHECK (title != ''),
  author varchar(50) CHECK (author != ''),
  body text CHECK (body != ''),
  urlTitle varchar(255) PRIMARY KEY UNIQUE CHECK (urlTitle != '')
);

CREATE TABLE products
(
  id serial PRIMARY KEY,
  name varchar(255),
  price money,
  inventory integer CHECK (inventory > 0)
);
