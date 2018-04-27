const collection = [{
    title: 'place',
    author: 'holder',
    body: 'placeholder',
  },
  {
    title: 'test',
    author: 'testtest',
    body: 'testtesttest'
  }
];

function all() {
  return collection;
}

function add(res, req) {

}

function getByTitle(){

}

module.exports = {
  all: all,
  add: add,
  getByTitle: getByTitle,

};