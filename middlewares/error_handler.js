const errorHandler = (err, req, res, next) => {
  console.log(err)

  if (err.code === 400) {
    res.status(400).json({
      code: 400,
      status: 'BAD REQUEST',
      error: {
        name: err.name,
        message: err.message,
      },
    })
  } else if (err.code === 401) {
    res.status(401).json({
      code: 401,
      status: 'UNAUTHORIZED',
      error: {
        name: err.name,
        message: err.message,
      },
    })
  } else if (err.code === 403) {
    res.status(403).json({
      code: 403,
      status: 'ACCESS DENIED',
      error: {
        name: err.name,
        message: err.message,
      },
    })
  } else if (err.code === 404) {
    res.status(404).json({
      code: 404,
      status: 'NOT FOUND',
      error: {
        name: err.name,
        message: err.message,
      },
    })
  } else if (err.name === 'CastError') {
    res.status(400).json({
      code: 400,
      status: 'BAD REQUEST',
      error: {
        name: err.name,
        message: err.message,
      },
    })
  } else if (err.name === 'ValidationError') {
    res.status(400).json({
      code: 400,
      status: 'BAD REQUEST',
      error: {
        name: err.name,
        message: err.message,
      },
    })
  } else if (err.name === 'JsonWebToken') {
    res.status(401).json({
      code: 401,
      status: 'UNAUTHORIZED',
      error: {
        name: err.name,
        message: err.message,
      },
    })
  } else if (err.name === 'AuthError') {
    res.status(401).json({
      code: 401,
      status: 'UNAUTHORIZED',
      error: {
        name: err.name,
        message: err.message,
      },
    })
  } else if (err.name === 'TokenExpiredError') {
    res.status(401).json({
      code: 401,
      status: 'UNAUTHORIZED',
      error: {
        name: err.name,
        message: err.message,
      },
    })
  }

  next()
}

module.exports = errorHandler
