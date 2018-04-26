const collection = [{
    id: 0,
    name: 'LOREM',
    price: 'IPSUM',
    inventory: 'LOREM IPSUM'
  },]

function all() {
  let collObj = {
    products: []
  };
  collection.forEach(element => {
    return collObj.products.push(element);
  });
  console.log(collObj);
  
  return collObj;
}

function add(req, res) {
  // 

}

module.exports = {
  all: all,
  add: add,
  // getByTitle: getByTitle,
  // editByTitle: editByTitle
};