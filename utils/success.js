const successResponse = (status, success, message) => {
  return {
    status: status,
    success: success,
    message: message
  }
}

const getSuccessResponse = (status, success, message, payload) => {
  return {
    status: status,
    success: success,
    message: message,
    payload: payload
  }
}

module.exports = {successResponse, getSuccessResponse};