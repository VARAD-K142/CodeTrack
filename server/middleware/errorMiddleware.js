const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : err.name === 'CastError' ? 400 : err.name === 'ValidationError' ? 400 : 500;
  res.status(statusCode).json({
    success: false,
    message: statusCode >= 500 ? 'Internal server error' : err.message || 'Request could not be processed'
  });
};

module.exports = { notFound, errorHandler };
