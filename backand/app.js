// app.js

const express = require('express');
const app = express();

// Import the router
const route = require('./Routerji/Router');
// const userRouter = require('./Routerji/userRouter'); // Rename to 'userRouter'

// Import the error middlewares
const middlewarerro = require('./middel/error');
const cachansyerror = require('./middel/cachansyerror');

// Mongoose connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ecomrassce')
    .then(() => {
        console.log('MongoDB connected successfully!');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Load environment variables for JWT (use dotenv)
require('dotenv').config();  // This will automatically look for .env file
require('dotenv').config();  


const JWT_SECRET = process.env.JWT_SECRET || 'khushiramprajapat'; // Default to fallback value if not in env
const JWT_EXPIRE = process.env.JWT_EXPIRE || 5; // Default to fallback value if not in env

// Set the port
const PORT = process.env.PORT || 7600;

// Use express.json() middleware
app.use(express.json());

// Use the routes from the Router file
app.use(route);
// app.use('/api', userRouter); // Ensure this path is correct

// Use the error-handling middleware
app.use(middlewarerro);
app.use(cachansyerror);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
