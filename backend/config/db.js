const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Agar .env mein MONGO_URI nahi hai, toh yeh default local database bana dega
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/eshop_advanced');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Agar connect na ho toh server band kar de
  }
};

module.exports = connectDB;