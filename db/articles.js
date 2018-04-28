const collection = [{
    title: 'place holder',
    author: 'placeholder',
    body: 'placeholderplaceholderplaceholderplaceholder',
    urlTitle: 'place%20holder',
    invalidTitle: false
  },
  {
    title: 'this is a test',
    author: 'test test',
    body: 'testtesttest',
    urlTitle: 'this%20is%20a%20test',
    invalidTitle: false
  },
  {
    title: 'Lorem Ipsum',
    author: 'Ipsum Lorem',
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    urlTitle: 'Lorem%20Ipsum',
    invalidTitle: false
  }
];
const titles = collection.map(function (article) {
  return article.title
});

function all() {
  return collection;
}

function create(data) {
  let newArticle = {
    title: data.title,
    author: data.author,
    body: data.body,
    urlTitle: encodeURI(data.title),
    invalidTitle: false,
  }
  titles.push(data.title);
  collection.push(newArticle);
  return newArticle;
}

function edit(data, reqTitle) {
  let articleIndex = titles.indexOf(reqTitle);
  let selectedArticle = collection[articleIndex];
  selectedArticle.title = data.title
  selectedArticle.author = data.author;
  selectedArticle.body = data.body;
  selectedArticle.urlTitle = encodeURI(data.title);
  selectedArticle.invalidTitle = data.invalidTitle;
  titles.splice(articleIndex, 1, data.title);
  return selectedArticle;
}

function getByTitle(reqTitle) {
  let articleIndex = titles.indexOf(reqTitle);
  return collection[articleIndex];
}

function remove(reqTitle) {
  let articleIndex = titles.indexOf(reqTitle);
  const target = collection[articleIndex];
  if (articleIndex === -1) {

  }
  collection.splice(collection.indexOf(target), 1);
  titles.splice(articleIndex, 1);
  return collection;
}

module.exports = {
  all: all,
  create: create,
  getByTitle: getByTitle,
  edit: edit,
  delete: remove

};