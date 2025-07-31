const errorHandler = (err, req, res, next) => {
  const timestamp = new Date().toISOString();
  
  // Log the error
  console.error(`[${timestamp}] Error:`, err.message);
  console.error(`[${timestamp}] Stack:`, err.stack);

  // Default error response
  let statusCode = err.status || err.statusCode || 500;
  let errorCode = err.code || 'INTERNAL_SERVER_ERROR';
  let message = err.message || 'Something went wrong';

  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    errorCode = 'VALIDATION_ERROR';
  } else if (err.name === 'CastError') {
    statusCode = 400;
    errorCode = 'INVALID_ID';
    message = 'Invalid ID format';
  } else if (err.type === 'entity.parse.failed') {
    statusCode = 400;
    errorCode = 'INVALID_JSON';
    message = 'Invalid JSON in request body';
  }

  // Don't expose internal errors in production
  if (statusCode === 500 && process.env.NODE_ENV === 'production') {
    message = 'Internal server error';
  }

  res.status(statusCode).json({
    error: {
      message,
      code: errorCode,
      ...(process.env.NODE_ENV === 'development' && { 
        stack: err.stack,
        timestamp 
      })
    }
  });
};

export default errorHandler;