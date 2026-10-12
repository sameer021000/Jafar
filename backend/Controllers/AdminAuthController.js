const AdminAuthService = require('../Services/AdminAuthService');

/**
 * Controller: Handles creation of initial admin account via Postman.
 * Expects { AdminID, Password }
 */
const handleCreateAdmin = async (req, res, next) => {
  try {
    const { AdminID, Password } = req.body;
    const result = await AdminAuthService.createAdmin(AdminID, Password);

    return res.status(201).json({
      Success: true,
      Message: 'Admin account successfully created with securely hashed password.',
      Data: {
        AdminID: result.AdminID,
      },
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        Success: false,
        Message: error.message,
      });
    }
    next(error);
  }
};

/**
 * Controller: Handles admin authentication and returns JWT token.
 * Expects { AdminID, Password }
 */
const handleLogin = async (req, res, next) => {
  try {
    const { AdminID, Password } = req.body;
    const result = await AdminAuthService.loginAdmin(AdminID, Password);

    return res.status(200).json({
      Success: true,
      Message: 'Authentication successful.',
      Data: {
        Token: result.Token,
        AdminID: result.AdminID,
      },
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        Success: false,
        Message: error.message,
      });
    }
    next(error);
  }
};

/**
 * Controller: Handles session verification for active JWT tokens.
 */
const handleVerifySession = async (req, res) => {
  return res.status(200).json({
    Success: true,
    Valid: true,
    Message: 'Token is valid.',
    Admin: {
      AdminID: req.admin.AdminID,
    },
  });
};

/**
 * Controller: Handles session logout.
 */
const handleLogout = async (req, res) => {
  return res.status(200).json({
    Success: true,
    Message: 'Logged out successfully.',
  });
};

module.exports = {
  handleCreateAdmin,
  handleLogin,
  handleVerifySession,
  handleLogout,
};
