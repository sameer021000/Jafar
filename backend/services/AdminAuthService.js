const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/AdminModel');

/**
 * Service: Creates a new admin account.
 * Used for Postman credential injection.
 * 
 * @param {string} adminId 
 * @param {string} password 
 * @returns {Promise<{ adminId: string }>}
 */
const createAdmin = async (adminId, password) => {
  const normalizedId = adminId.trim().toLowerCase();

  // Check if admin already exists
  const existingAdmin = await Admin.findOne({ adminId: normalizedId });
  if (existingAdmin) {
    const error = new Error('An admin account with this ID already exists.');
    error.statusCode = 409;
    throw error;
  }

  // Creating instance triggers pre('save') bcrypt hash hook
  const newAdmin = new Admin({
    adminId: normalizedId,
    password: password,
  });

  await newAdmin.save();

  return {
    adminId: newAdmin.adminId,
  };
};

/**
 * Service: Authenticates admin credentials and returns JWT token.
 * 
 * @param {string} adminId 
 * @param {string} password 
 * @returns {Promise<{ token: string, adminId: string }>}
 */
const loginAdmin = async (adminId, password) => {
  const normalizedId = adminId.trim().toLowerCase();

  // Find admin explicitly including password hash (select: false)
  const admin = await Admin.findOne({ adminId: normalizedId }).select('+password');

  if (!admin) {
    const error = new Error('Invalid Admin ID or password. Please verify your credentials.');
    error.statusCode = 401;
    throw error;
  }

  // Compare entered password with stored bcrypt hash
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    const error = new Error('Invalid Admin ID or password. Please verify your credentials.');
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
      adminId: admin.adminId,
    },
    jwtSecret,
    { expiresIn }
  );

  return {
    token,
    adminId: admin.adminId,
  };
};

module.exports = {
  createAdmin,
  loginAdmin,
};
