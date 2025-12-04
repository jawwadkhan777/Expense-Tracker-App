require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const path = require('path');

// middleware to handle CORS and JSON parsing
app.use(cors(
    {
        origin: process.env.FRONTEND_URL || '*', // Replace with your frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// Static folder for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/income', incomeRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Sample route
app.get('/', (req, res) => {
    res.send('Hello World!');
});