const collection = [{
    id: 0,
    name: 'test',
    price: 123,
    inventory: 456,
  },
  {
    id: 1,
    name: 'test2',
    price: 789,
    inventory: 101112
  },
  {
    id: 2,
    name: 'test3',
    price: 131415,
    inventory: 161718
  }
];
const idValues = collection.map(function (product) {
  return product.id
});


function all() {
  return collection;
};

function getById(productId) {
  let productIndex = idValues.indexOf(productId);
  return collection[productIndex];
}

function create(data) {
  let newId = Math.floor(Math.random() * 10000);
  let valueIndex = idValues.indexOf(newId)
  function createId() {
    if (valueIndex === -1) {
      console.log(newId)
      idValues.push(newId);
      return newId;
    }
    newId = Math.floor(Math.random() * 10000)
    valueIndex = idValues.indexOf(newId)
    createId()
  }

  let newProduct = {
    id: createId(),
    name: data.name,
    price: parseFloat(data.price),
    inventory: parseFloat(data.inventory),
    validName: true,
    validPrice: true,
    validInventory: true
  }
  console.log('hello');
  
  collection.push(newProduct);
  return collection;
};

function edit(data, productId) {
  let productIndex = idValues.indexOf(productId);
  let selectedObj = collection[productIndex];
  selectedObj.name = data.name;
  selectedObj.price = parseFloat(data.price);
  selectedObj.inventory = parseFloat(data.inventory);
  return selectedObj;
};

function remove(productId) {
  let productIndex = idValues.indexOf(productId);
  const target = collection[productIndex];
  if (productIndex === -1) {
    return collection[productIndex];
  }
  collection.splice(collection.indexOf(target), 1)
  idValues.splice(productIndex, 1);
  return collection;
};

module.exports = {
  all: all,
  getById: getById,
  create: create,
  edit: edit,
  delete: remove
};