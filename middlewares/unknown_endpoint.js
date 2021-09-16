const unknownEndpoint = (req, res, next) => {
    res.status(404).json()
}

module.exports = unknownEndpoint