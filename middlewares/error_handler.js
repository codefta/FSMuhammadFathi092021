const errorHandler = (err, req, res, next) => {
    console.log(err)

    if (err.code === 400) {
        res.status(400).json()
    } else if (err.code === 401) {

    } else if (err.code === 404) {

    } else if (err.name === "CastError") {
        
    } else if (err.name === "ValidationError") {
        
    } else if (err.name === 'JsonWebToken') {

    } else if (err.name === 'AuthError') {

    } else if (err.name === 'TokenExpiredError') {
        
    }

    next()
}

module.exports = errorHandler