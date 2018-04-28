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

function create(data) {
  // if(titles.indexOf(data.title) !== -1){

  // }
  let newArticle = {
    title: data.title,
    author: data.author,
    body: data.body,
    urlTitle: encodeURI(data.title)
  } 
  titles.push(data.title);
  collection.push(newArticle);
  return newArticle;
}

function edit(data, reqTitle){
  let articleIndex = titles.indexOf(reqTitle);
  let selectedArticle = collection[articleIndex];
  selectedArticle.title = data.title;
  selectedArticle.author = data.author;
  selectedArticle.body = data.body;
  titles.splice(articleIndex, 1, data.title);
  return selectedArticle;
}

function getByTitle(reqTitle) {
  let articleIndex = titles.indexOf(reqTitle); 
  return collection[articleIndex];
}

module.exports = {
  all: all,
  create: create,
  getByTitle: getByTitle,
  edit: edit,

};