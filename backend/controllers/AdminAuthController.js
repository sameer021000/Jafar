const AdminAuthService = require('../services/AdminAuthService');

/**
 * Controller: Handles creation of initial admin account via Postman.
 */
const handleCreateAdmin = async (req, res, next) => {
  try {
    const { adminId, password } = req.body;
    const result = await AdminAuthService.createAdmin(adminId, password);

    return res.status(201).json({
      success: true,
      message: 'Admin account successfully created with securely hashed password.',
      data: result,
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};

/**
 * Controller: Handles admin authentication and returns JWT token.
 */
const handleLogin = async (req, res, next) => {
  try {
    const { adminId, password } = req.body;
    const result = await AdminAuthService.loginAdmin(adminId, password);

    return res.status(200).json({
      success: true,
      message: 'Authentication successful.',
      data: result,
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};

/**
 * Controller: Handles session verification for active JWT tokens.
 */
const handleVerifySession = async (req, res) => {
  // req.admin populated by verifyAdminToken middleware
  return res.status(200).json({
    success: true,
    valid: true,
    message: 'Token is valid.',
    admin: {
      adminId: req.admin.adminId,
    },
  });
};

/**
 * Controller: Handles session logout.
 */
const handleLogout = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully.',
  });
};

module.exports = {
  handleCreateAdmin,
  handleLogin,
  handleVerifySession,
  handleLogout,
};
