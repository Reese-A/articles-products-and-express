const collection = [{
    id: 0,
    name: 'test',
    price: 123,
    inventory: 456,
    invalidPrice: false,
    invalidInventory: false
  },
  {
    id: 1,
    name: 'test2',
    price: 789,
    inventory: 101112,
    invalidPrice: false,
    invalidInventory: false
  },
  {
    id: 2,
    name: 'test3',
    price: 131415,
    inventory: 161718,
    invalidPrice: false,
    invalidInventory: false
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
  let newId = Math.floor(Math.random() * 100000);
  console.log('initial: '+newId);

  function createId() {
    if (!idValues.includes(newId)) {
      console.log('final: '+newId)
      idValues.push(newId);
      console.log(idValues);
      return newId;
    }
    newId = Math.floor(Math.random() * 100000)
    console.log('running: '+newId);
    return createId()
  };

  let newProduct = {
    id: createId(),
    name: data.name,
    price: parseFloat(data.price),
    inventory: parseFloat(data.inventory),
    invalidPrice: data.invalidPrice,
    invalidInventory: data.invalidInventory
  };
  console.log(newProduct);
  
  collection.push(newProduct);
  return newProduct;
};

function edit(data, productId) {
  let productIndex = idValues.indexOf(productId);
  let selectedProduct = collection[productIndex];
  selectedProduct.name = data.name;
  selectedProduct.price = parseFloat(data.price);
  selectedProduct.inventory = parseFloat(data.inventory);
  selectedProduct.invalidPrice = data.invalidPrice;
  selectedProduct.invalidInventory = data.invalidInventory
  return selectedProduct;
};

function remove(productId) {
  let productIndex = idValues.indexOf(productId);
  const target = collection[productIndex];
  if (productIndex === -1) {
    return collection;
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