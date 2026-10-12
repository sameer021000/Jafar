const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * Admin Schema
 * Minimal schema containing only adminId and password with automatic bcrypt hashing.
 */
const adminSchema = new mongoose.Schema(
  {
    adminId: {
      type: String,
      required: [true, 'Admin ID is required.'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      select: false, // Prevents password hash from being included in standard queries
    },
  },
  {
    timestamps: true, // Automatically records createdAt and updatedAt
    versionKey: false, // Disables __v
  }
);

/**
 * Pre-save hook: Automatically hashes password with bcrypt before persisting to MongoDB Atlas.
 * In modern Mongoose, an async function should not accept or call next().
 */
adminSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  this.password = await bcrypt.hash(this.password, salt);
});

const Admin = mongoose.model('AdminDetails', adminSchema);

module.exports = Admin;
