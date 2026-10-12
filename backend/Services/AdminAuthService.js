const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../Models/AdminModel');

/**
 * Service: Creates a new admin account.
 * Used for Postman credential injection.
 * AdminID is case-sensitive (exact string saved without lowercasing).
 * 
 * @param {string} adminID 
 * @param {string} password 
 * @returns {Promise<{ AdminID: string }>}
 */
const createAdmin = async (adminID, password) => {
  const trimmedAdminID = adminID.trim();

  // Check if admin already exists with exact case
  const existingAdmin = await Admin.findOne({ AdminID: trimmedAdminID });
  if (existingAdmin) {
    const error = new Error('An admin account with this AdminID already exists.');
    error.statusCode = 409;
    throw error;
  }

  // Creating instance triggers pre('save') bcrypt hash hook
  const newAdmin = new Admin({
    AdminID: trimmedAdminID,
    Password: password,
  });

  await newAdmin.save();

  return {
    AdminID: newAdmin.AdminID,
  };
};

/**
 * Service: Authenticates admin credentials and returns JWT token.
 * AdminID is matched with exact case-sensitivity.
 * 
 * @param {string} adminID 
 * @param {string} password 
 * @returns {Promise<{ Token: string, AdminID: string }>}
 */
const loginAdmin = async (adminID, password) => {
  const trimmedAdminID = adminID.trim();

  // Find admin with exact case, explicitly including Password hash
  const admin = await Admin.findOne({ AdminID: trimmedAdminID }).select('+Password');

  if (!admin) {
    const error = new Error('Invalid AdminID or Password. Please verify your credentials.');
    error.statusCode = 401;
    throw error;
  }

  // Compare entered password with stored bcrypt hash
  const isMatch = await bcrypt.compare(password, admin.Password);
  if (!isMatch) {
    const error = new Error('Invalid AdminID or Password. Please verify your credentials.');
    error.statusCode = 401;
    throw error;
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not configured on the server.');
  }

  const expiresIn = process.env.JWT_EXPIRES_IN || '24h';

  // Sign token containing admin identifier and MongoDB _id
  const token = jwt.sign(
    {
      id: admin._id,
      AdminID: admin.AdminID,
    },
    jwtSecret,
    { expiresIn }
  );

  return {
    Token: token,
    AdminID: admin.AdminID,
  };
};

module.exports = {
  createAdmin,
  loginAdmin,
};
