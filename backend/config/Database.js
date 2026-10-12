const mongoose = require('mongoose');

/**
 * Connect to MongoDB Atlas (Jafar database)
 * Configures connection options and global lifecycle event listeners.
 */
const connectDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables.');
    }

    // Event listeners for connection monitoring
    mongoose.connection.on('connected', () => {
      console.log('MongoDB Atlas: Connection established successfully.');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB Atlas: Connection error encountered:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB Atlas: Disconnected from database.');
    });

    await mongoose.connect(mongoUri);
  } catch (error) {
    console.error('Critical Database Error: Failed to connect to MongoDB Atlas:', error.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;
