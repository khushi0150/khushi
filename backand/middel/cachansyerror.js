module.exports = (thefunk) => {
    return async (req, res, next) => {
        try {
            await thefunk(req, res, next); // Await the async function
        } catch (err) {
            next(err); // Pass the error to the error handler
        }
    };
};
