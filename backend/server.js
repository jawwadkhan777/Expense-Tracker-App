require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

// middleware to handle CORS and JSON parsing
app.use(cors(
    {
        origin: process.env.FRONTEND_URL || '*', // Replace with your frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Sample route
app.get('/', (req, res) => {
    res.send('Hello World!');
});