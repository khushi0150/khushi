// router.js
const express = require('express');
const router = express.Router();
const {
  allProduct,
  creactProduct,
  updateProduct,
  deleteProduct,
  getproductsDetails,
  registerUser,
  loginUser,
  logoutUser,
  authorizeRoles,
  forgotPassword,
} = require('../contorlesji/contorles'); // Ensure this path is correct

// Define the routes
router.get('/allProduct',  allProduct);   
router.post('/creactProduct', creactProduct); 
router.put('/updateProduct/:id', updateProduct);
router.delete('/deleteProduct/:id',authorizeRoles('admin'), deleteProduct);
router.get('/getproductsDetails/:id', getproductsDetails);

// User registration and login
router.post('/registerUser', registerUser);
router.post('/loginUser', loginUser);
// User logout
router.get('/logoutUser', logoutUser);
//ForgotPassword user ji 
router.post('/forgotPassword',forgotPassword)

module.exports = router;
