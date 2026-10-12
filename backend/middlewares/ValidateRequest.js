/**
 * Higher-order middleware factory to execute pure validation schemas against req.body.
 * 
 * @param {function} validationFn - Pure validation function returning { isValid, error, fieldErrors }
 * @returns {function} Express middleware
 */
const validateRequest = (validationFn) => {
  return (req, res, next) => {
    const result = validationFn(req.body);

    if (!result.isValid) {
      return res.status(400).json({
        success: false,
        message: result.error || 'Validation failed.',
        fieldErrors: result.fieldErrors || {},
      });
    }

    next();
  };
};

module.exports = validateRequest;
