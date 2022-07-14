const CustomAPIError = require('./custom-api')
const UnauthenticatedError = require('./unauthenticated') //401
const NotFoundError = require('./not-found') //404
const BadRequestError = require('./bad-request') //400

module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
}
