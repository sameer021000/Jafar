const express = require('express');
const router = express.Router();

const AdminAuthController = require('../controllers/AdminAuthController');
const validateRequest = require('../middlewares/ValidateRequest');
const { validateAdminCredentialsPayload } = require('../validations/AdminAuthValidation');
const verifyAdminToken = require('../middlewares/VerifyAdminToken');

/**
 * Route: POST /api/admin/auth/create
 * Purpose: Allows pushing initial credentials via Postman (triggers bcrypt pre-save hash).
 */
router.post(
  '/create',
  validateRequest(validateAdminCredentialsPayload),
  AdminAuthController.handleCreateAdmin
);

/**
 * Route: POST /api/admin/auth/login
 * Purpose: Authenticates admin credentials, verifies bcrypt hash, and issues JWT token.
 */
router.post(
  '/login',
  validateRequest(validateAdminCredentialsPayload),
  AdminAuthController.handleLogin
);

/**
 * Route: GET /api/admin/auth/verify
 * Purpose: Checks if provided Bearer JWT token is valid (for session rehydration on reload).
 */
router.get(
  '/verify',
  verifyAdminToken,
  AdminAuthController.handleVerifySession
);

/**
 * Route: POST /api/admin/auth/logout
 * Purpose: Graceful session logout endpoint.
 */
router.post(
  '/logout',
  AdminAuthController.handleLogout
);

module.exports = router;
