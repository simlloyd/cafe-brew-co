require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express();

app.use(express.json());
app.get('/', (req, res) => {
    res.json({ message: 'Coffee shop API is Alive!' });
});
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('MongoDB connection error:', err));

app.listen(5000, () => {
    console.log('Coffee shop server is running on port 5000');
});