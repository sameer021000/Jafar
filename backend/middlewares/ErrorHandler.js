/**
 * Central Error Handler Middleware
 * Catches unhandled exceptions, Mongoose validation errors, and duplicate key errors.
 */
const errorHandler = (err, req, res, next) => {
  console.error('Unhandled Application Error:', err);

  // Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return res.status(409).json({
      success: false,
      message: `An account with that ${field} already exists.`,
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const fieldErrors = {};
    for (const key in err.errors) {
      fieldErrors[key] = err.errors[key].message;
    }
    return res.status(400).json({
      success: false,
      message: 'Validation failed.',
      fieldErrors,
    });
  }

  // Generic internal server error
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || 'An unexpected server error occurred.',
  });
};

module.exports = errorHandler;
