module.exports = function dataCheck() {
  return function (req, res, next) {
    const data = req.body;
    let requirements = Object.keys(data);
    console.log(data);
    
    if (requirements.length >= 3) {      
      if (requirements.includes('id')) {
        requirements.splice(requirements.indexOf('id'), 1)
      }
      if (requirements.includes('urlTitle')) {
        requirements.splice(requirements.indexOf('urlTitle'), 1)
      }
      for (i = 0; i < requirements.length; i++) {
        if (data[requirements[i]]) {
          return next();
        } else {
          return res.send('invalid input');
        }
      }
    }
    return next()
  }
}