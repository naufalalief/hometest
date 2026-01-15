function successResponse(res, status, message, data) {
  return res.status(status).json({ statusCode: status, message, data });
}

function errorResponse(res, status, message, error = null) {
  return res.status(status).json({ statusCode: status, message, error });
}

module.exports = { successResponse, errorResponse };
