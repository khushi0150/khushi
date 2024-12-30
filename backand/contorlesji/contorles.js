
const mongoose = require('mongoose'); 

const Product = require('../models/prodactmudels');
// const ErrorHandler = require('../utels/errorhandeling');
const ApiFeatures = require('../utels/apifetures');
const bcrypt = require('bcryptjs');
const regmodel  = require('../models/usermodel');
//    const  authorizeRoles= require('../middel/authorizeRoles ')
// const sendEmail=require('../utels/sendEmail')






// Define the allProduct function

exports.allProduct = async (req, res, next) => {

  const resultpage=5;
   const prodactcount=await product.countDocuments()

  try {
      const apiFeatures = new ApiFeatures(Product.find(), req.query);

      apiFeatures.search()
                  .filter().pagination(resultpage)

      // Execute the query and get products
      const products = await apiFeatures.query; 
      if (!products || products.length === 0) {
          return res.status(404).json({
              success: false,
              message: 'No products found',
          });
      }

      // Send the response back with the products found
      res.status(200).json({
          success: true,
          products,
          prodactcount,
      });
  } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({
          success: false,
          message: error.message,
      });
  }
};
















  
// Define the GET  product details for product details

exports.getproductsDetails = async (req, res,next) => {
    try {
      const productId = req.params.id.trim(); 
  
      // Check if the ID is valid
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new ErrorHandler("product not found",404))
      }
  
      console.log("Request Params ID:", productId);
  
      const product = await Product.findById(productId);
  
      // If the product is not found
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new ErrorHandler("product not found",404))
      }
  
  
      // Respond with the found product
      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };






// Create Product  Addmain
exports.creactProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body); // Fixed variable shadowing
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// Define the UdateProduct 


exports.updateProduct = async (req, res) => {
    try {
      console.log("Request Params:", req.params.id);
      console.log("Request Body:", req.body);
  
      let product = await Product.findById(req.params.id);
      console.log("Product Found:", product);
  
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new ErrorHandler("product not found",404))
      }
  
  
      product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      console.log("Updated Product:", product);
  
      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  


  // Delete Product Controller
  exports.deleteProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
  
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new ErrorHandler("product not found",404))
      }
  
  
      // Delete the product using deleteOne
      await product.deleteOne();
  
      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// /////// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Register   user k lay h ya s

  // const User = require('../models/User'); // Adjust the path as needed

     const User=require('../models/usermodel')
  const jwt = require('jsonwebtoken');
  
  exports.registerUser = async (req, res) => {
      try {
          const { name, email, password, avatar } = req.body;
  
          // Validate input
          if (!name || !email || !password || !avatar) {
              return res.status(400).json({ message: 'All fields are required' });
          }
  
          // Check if the user already exists
          const existingUser = await User.findOne({ email });
          if (existingUser) {
              return res.status(400).json({ message: 'User already exists' });
          }
  
          // Create the user
          const user = await User.create({
              name,
              email,
              password,
              avatar,
          });
  
          // Generate JWT token
          const token = user.generateToken();
  
          res.status(201).json({
              message: 'User registered successfully',
              token,
              user,
          });
      } catch (error) {
          res.status(500).json({
              message: `Error in register API: ${error.message}`,
          });
      }
  };
  



  ///Login User 

  exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if both email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter both email and password' });
        }

        // Find the user by email
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = user.generateToken();

        // Return success response
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            },
        });
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
};

  // user  logout  ki Api   

  exports.logoutUser = async (req, res, next) => {
    try {
        // Clear the cookie containing the JWT token (if you're using cookies for authentication)
        res.cookie('token', null, {
            httpOnly: true,
            expires: new Date(Date.now()), // Expire immediately
        });

        res.status(200).json({
            success: true,
            message: 'Logged out successfully',
        });
    } catch (error) {
        next(error); // Pass any errors to the error-handling middleware
    }
};
//Forget password user 
exports.forgotPassword = async (req, res, next) => {
  let user;
  
  try {
    // Find user by email
    user = await User.findOne({ email: req.body.email });

    if (!user) {
      // Create a custom error with statusCode
      const error = new Error("User not found");
      error.statusCode = 404;  // Use statusCode instead of status
      return next(error);  // Pass the error to error handling middleware
    }

    // Generate a reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset token is: \n\n ${resetPasswordUrl} \n\nIf you have not requested this email, please ignore it.`;

    // Send the email with the reset password link
    await sendEmail({
      email: user.email,
      subject: `Ecommerce password recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    if (user) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
    }

    const err = new Error("Something went wrong while sending the email");
    err.statusCode = 500;  // Use statusCode here as well
    return next(err);  // Pass the error to error handling middleware
  }
};




 exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
      // Check if the user's role is allowed to access the resource
      if (!roles.includes(req.user.role)) {
         return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403));
      }
       next();
   };
 };














  // Updated UpdateProduct function
// exports.updateProduct = async (req, res, next) => {
//   try {
//     console.log("Request Params:", req.params.id);
//     console.log("Request Body:", req.body);

//     let product = await Product.findById(req.params.id);
//     console.log("Product Found:", product);

//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//       return next(new ErrorHandler("Product not found", 404)); // Corrected objectId check
//     }

//     product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//       useFindAndModify: false,
//     });
//     console.log("Updated Product:", product);

//     res.status(200).json({
//       success: true,
//       product,
//     });
//   } catch (error) {
//     console.error("Error:", error.message);
//     next(error); // Pass error to global error handler
//   }
// };

// // Updated DeleteProduct function
// exports.deleteProduct = async (req, res, next) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//       return next(new ErrorHandler("Product not found", 404)); // Corrected objectId check
//     }

//     // Delete the product using deleteOne
//     await product.deleteOne();

//     res.status(200).json({
//       success: true,
//       message: "Product deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error:", error.message);
//     next(error); // Pass error to global error handler
//   }
// };
