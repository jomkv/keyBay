exports.errorHandler = (error, req, res, next) => {
    let statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode).json({
        message: error.message,
        // if production mode, hide stack
        stack: process.env.NODE_ENV === "production" ? null : error.stack
    });
}