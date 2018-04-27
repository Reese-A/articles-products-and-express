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
];
const idValues = collection.map(function (product){
  return product.id
});

function all() {
  return collection;
};

function getById(productId){
  let productIndex = idValues.indexOf(productId);
  return collection[productIndex]; 
}

function create(data) {
  let newProduct = {
    id: Math.floor(Math.random() * 1000),
    name: data.name,
    price: parseFloat(data.price),
    inventory: parseFloat(data.inventory)
  }
  collection.push(newProduct);
  idValues.push(newProduct.id);
  return collection;
};

function edit(data, productId){
  let productIndex = idValues.indexOf(productId);
  let selectedObj = collection[productIndex];
  selectedObj.name = data.name;
  selectedObj.price = parseFloat(data.price);
  selectedObj.inventory = parseFloat(data.inventory);
  return selectedObj;
};

function remove(productId){
  let productIndex = idValues.indexOf(productId);
  const target = collection[productIndex];
  if(productIndex === -1){
    return collection[productIndex];
  }
  collection.splice(collection.indexOf(target), 1)
  idValues.splice(productIndex, 1);
  return collection;
}

module.exports = {
  all: all,
  getById: getById,
  create: create,
  edit: edit,
  delete: remove
};