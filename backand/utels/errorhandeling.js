// const errorHandler = (err, req, res, next) => {
//     // Use `err.statusCode` instead of `err.status`
//     const statusCode = err.statusCode || 500;  // Default to 500 if no statusCode is provided
//     const message = err.message || 'Something went wrong';
  
//     res.status(statusCode).json({
//       success: false,
//       message,
//     });
//   };
  