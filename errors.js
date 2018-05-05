const errors = {
  notFound: {
    message: 'ERROR 404 NOT FOUND',
    instructions: 'Please enter a valid url'
  },
  badRequest: {
    message: 'ERROR 400 BAD REQUEST',
    instructions: 'Please provide valid values for all fields before submitting'
  },
  serverErr: {
    message: 'ERROR 500 INTERNAL SERVER ERROR',
    instructions: 'Server has encountered an error'
  }
};

module.exports = errors;