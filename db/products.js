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

function create(data) {
  let newProduct = {
    id: collection.length,
    name: data.name,
    price: parseFloat(data.price),
    inventory: parseFloat(data.inventory)
  }
  collection.push(newProduct);
  return collection;
}

module.exports = {
  all: all,
  create: create,
  // getByTitle: getByTitle,
  // editByTitle: editByTitle
};