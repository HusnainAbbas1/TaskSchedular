exports.sendResponse = (status, statusCode, message, body, res) => {
  res.status(statusCode).json({
    status,
    message,
    body,
  });
};
