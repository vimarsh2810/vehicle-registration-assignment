const errorResponse = (status, success, message) => {
  return {
    status: status,
    success: success,
    message: message
  }
}

module.exports = errorResponse;