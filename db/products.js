const collection = [];

function all(res, req) {
  req.send('smoke test')
}

function add(res, req) {
  // 

}

module.exports = {
  all: all,
  add: add,
  // getByTitle: getByTitle,
  // editByTitle: editByTitle
};