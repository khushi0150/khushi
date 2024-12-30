// // middleware/authorizeRoles.js

// const ErrorHandler = require('../utels/errorhandeling'); // Import the ErrorHandler class

// exports.authorizeRoles = (...roles) => {
//     return (req, res, next) => {
//         // Check if the user's role is allowed to access the resource
//         if (!roles.includes(req.user.role)) {
//             return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403)); // Correctly using ErrorHandler
//         }
//         next();
//     };
// };
