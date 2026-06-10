const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

connectDB();

app.use(cors({
 origin:'http://localhost:3000',
 credentials:true
}));

app.use(express.json());


app.use('/api/products', productRoutes);
app.use('/api/users', authRoutes);


app.get('/',(req,res)=>{
 res.send("Backend Server Running");
});


const PORT=5000;

app.listen(PORT,()=>{
 console.log(`Server running on ${PORT}`);
});