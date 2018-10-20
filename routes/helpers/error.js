module.exports = {
  error(code, message) {
    const error = {
      code: code,
      message: message,
    }
    return error;
  }
}