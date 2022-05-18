// This file exports a function used as middleware to made errors readable in json format
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
  
    res.status(statusCode)
  
    res.json({
        commentMessage: err.message,
        goalMessage: err.message,
        authMessage: err.message,
        planMessage: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}

module.exports = {
  errorHandler,
}
  