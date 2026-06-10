const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, // Yahan aap apni asset pic ka path/URL dalengi
  description: { type: String, required: true },
  category: { type: String, required: true }, // laptop, headphone, chair, iphone etc.
  countryLogo: { type: String }, // Agar product ke sath country ki pic lagani ho
  stock: { type: Number, required: true, default: 10 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);