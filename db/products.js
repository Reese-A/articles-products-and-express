const collection = [{
    id: 0,
    name: 'LOREM',
    price: 'IPSUM',
    inventory: 'LOREM IPSUM'
  },
  {
    id: 1,
    name: 'IPSUM',
    price: 'LOREM',     
    inventory: 'IPSUM LOREM'
  },
  {
    id: 2,
    name: 'THIS',
    price: 'IS',
    inventory: 'A PLACEHOLDER'
  }
]

function all() {
  return collection;
}

function add(req, res) {
  // 

}

module.exports = {
  all: all,
  add: add,
  //create: create,
  // getByTitle: getByTitle,
  // editByTitle: editByTitle
};