const collection = [{
    title: 'place holder',
    author: 'placeholder',
    body: 'placeholderplaceholderplaceholderplaceholder',
    urlTitle: 'place%20holder'
  },
  {
    title: 'this is a test',
    author: 'testtest',
    body: 'testtesttest',
    urlTitle: 'this%20is%20a%20test'
  }
];
const titles = collection.map(function (article) {
  return article.title
});

function all() {
  return collection;
}

function add(res, req) {

}

function getByTitle(titleUrl) {
  let articleIndex = titles.indexOf(titleUrl);
  return collection[articleIndex];
}

module.exports = {
  all: all,
  add: add,
  getByTitle: getByTitle,

};