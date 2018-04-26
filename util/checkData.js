module.exports = function dataCheck() {
  return function (req, res, next) {
    const data = req.body;
    let requirements = Object.keys(data);
    if (requirements.length === 0 | 3) {
      return next();
    } else {
      if (requirements.includes('id')) {
        requirements.splice(requirements.indexOf('id'), 1)
      }
      if(requirements.includes('urlTitle')){
        requirements.splice(requirements.indexOf('urlTitle'), 1)
      }
      for (i = 0; i < requirements.length; i++) {
        if (data.requirements[i]) {
          return next();
        } else {
          return false;
        }
      }
    }
  }
}