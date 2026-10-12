const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * Admin Schema
 * Minimal schema containing only AdminID and Password with automatic bcrypt hashing.
 * AdminID is strictly case-sensitive.
 */
const adminSchema = new mongoose.Schema(
  {
    AdminID: {
      type: String,
      required: [true, 'AdminID is required.'],
      unique: true,
      trim: true,
      index: true,
    },
    Password: {
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
 * Pre-save hook: Automatically hashes Password with bcrypt before persisting to MongoDB Atlas.
 * Triggers only when the Password field has been modified or newly created.
 */
adminSchema.pre('save', async function () {
  if (!this.isModified('Password')) {
    return;
  }

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  this.Password = await bcrypt.hash(this.Password, salt);
});

const Admin = mongoose.model('AdminDetails', adminSchema);

module.exports = Admin;
