require('dotenv').config(); // <--- Yeh line aap ke .env file se MONGO_URI uthayegi
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product'); 
const products = require('./data/products'); 

const importData = async () => {
  try {
    // Pehle database properly connect hone ka wait karein
    await connectDB();

    // Phir data insert karein
    await Product.deleteMany();
    await Product.insertMany(products);

    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error importing data: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    
    await Product.deleteMany();
    console.log('🗑️ Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}