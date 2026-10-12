const express = require('express');
const router = express.Router();

const AdminAuthController = require('../Controllers/AdminAuthController');
const validateRequest = require('../Middlewares/ValidateRequest');
const { validateAdminCredentialsPayload } = require('../Validations/AdminAuthValidation');
const verifyAdminToken = require('../Middlewares/VerifyAdminToken');

/**
 * Route: POST /api/admin/auth/create
 * Purpose: Allows pushing initial credentials via Postman (triggers bcrypt pre-save hash).
 */
router.post(
  '/createAdmin',
  validateRequest(validateAdminCredentialsPayload),
  AdminAuthController.handleCreateAdmin
);

/**
 * Route: POST /api/admin/auth/login
 * Purpose: Authenticates admin credentials, verifies bcrypt hash, and issues JWT token.
 */
router.post(
  '/adminLogin',
  validateRequest(validateAdminCredentialsPayload),
  AdminAuthController.handleLogin
);

/**
 * Route: GET /api/admin/auth/verify
 * Purpose: Checks if provided Bearer JWT token is valid (for session rehydration on reload).
 */
router.get(
  '/adminTokenVerification',
  verifyAdminToken,
  AdminAuthController.handleVerifySession
);

/**
 * Route: POST /api/admin/auth/logout
 * Purpose: Graceful session logout endpoint.
 */
router.post(
  '/adminLogout',
  AdminAuthController.handleLogout
);

module.exports = router;
