// const fs = require('fs');

// module.exports = (err, req, res, next) => {
//     const statusCode = err.status || 500;
//     const message = err.message || 'Internal Server Error';

//     // Log error to a file (e.g., logs/errors.log)
//     fs.appendFileSync('logs/errors.log', `${new Date()} - ${message}\n${err.stack || ''}\n\n`);

//     res.status(statusCode).json({
//         success: false,
//         message,
//         stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
//     });
// };
