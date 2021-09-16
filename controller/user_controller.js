const router = require('express').Router()
const User = require('../model/user_model')
const bcrypt = require('bcryptjs')
const jwtAuth = require('../middlewares/jwt_auth')
const AccessControl = require('accesscontrol')

const ac = new AccessControl()
ac.grant('operator')
  .readAny('user')
  .grant('superadmin')
  .extend('operator')
  .createAny('user')
  .updateAny('user')
  .deleteAny('user')

router.get('/', jwtAuth, async (req, res, next) => {
  const permission = ac.can(req.user.role).readAny('user')
  try {
    if (!permission.granted) {
      throw {
        code: 403,
        name: 'AccessForbidden',
        message: 'Access Forbidden for this endpoint',
      }
    }
    const limit = parseInt(req.query.limit)
    const skip = parseInt(req.query.skip)
    const lastname = req.query.lastname
    const sortBy = req.query.sort_by

    let users = await User.find({})
      .skip(skip ? skip : 0)
      .limit(limit ? limit : 0)

    if (lastname) {
      users = await User.find({ lastName: lastname })
        .skip(skip ? skip : 0)
        .limit(limit ? limit : 0)
    }

    if (sortBy === 'lastname.asc') {
      if (lastname) {
        users = await User.find({ lastName: lastname })
          .skip(skip ? skip : 0)
          .limit(limit ? limit : 0)
          .sort({ lastName: 'asc' })
      } else {
        users = await User.find({})
          .skip(skip ? skip : 0)
          .limit(limit ? limit : 0)
          .sort({ lastName: 'asc' })
      }
    } else if (sortBy === 'lastname.desc') {
      if (lastname) {
        users = await User.find({ lastName: lastname })
          .skip(skip ? skip : 0)
          .limit(limit ? limit : 0)
          .sort({ lastName: 'desc' })
      } else {
        users = await User.find({})
          .skip(skip ? skip : 0)
          .limit(limit ? limit : 0)
          .sort({ lastName: 'desc' })
      }
    }

    res.status(200).json({
      code: 200,
      status: 'OK',
      data: users.map((u) => u.toJSON()),
    })
  } catch (e) {
    next(e)
  }
})

router.post('/', jwtAuth, async (req, res, next) => {
  const permission = ac.can(req.user.role).createAny('user')

  try {
    if (!permission.granted) {
      throw {
        code: 403,
        name: 'AccessForbidden',
        message: 'Access Forbidden for this endpoint',
      }
    }
    const body = req.body
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(body.password, salt)

    userIfExist = await User.findOne({ email: body.email })
    if (userIfExist) {
      throw {
        code: 400,
        name: 'ValidationError',
        message: 'Email exist, please choose another email',
      }
    }

    const userToSave = new User({
      firstName: body.firstName,
      lastName: body.lastName,
      birthOfDate: body.birthOfDate,
      email: body.email,
      role: body.role,
      password: passwordHash,
    })

    const user = await userToSave.save()

    res.status(200).json({
      code: 200,
      status: 'OK',
      data: {
        user,
      },
    })
  } catch (e) {
    next(e)
  }
})

router.get('/:userId', jwtAuth, async (req, res, next) => {
  const permission = ac.can(req.user.role).readAny('user')

  try {
    if (!permission.granted) {
      throw {
        code: 403,
        name: 'AccessForbidden',
        message: 'Access Forbidden for this endpoint',
      }
    }
    const user = await User.findById(req.params.userId)
    if (!user) {
      throw {
        code: 404,
        name: 'NOT FOUND',
        message: 'User not found',
      }
    }

    res.status(200).json({
      code: 200,
      status: 'OK',
      data: user.toJSON(),
    })
  } catch (e) {
    next(e)
  }
})

router.put('/:userId', jwtAuth, async (req, res, next) => {
  const permission = ac.can(req.user.role).updateAny('user')

  try {
    if (!permission.granted) {
      throw {
        code: 403,
        name: 'AccessForbidden',
        message: 'Access Forbidden for this endpoint',
      }
    }
    const body = req.body
    const userId = req.params.userId

    const objToUpdate = {
      firstName: body.firstName,
      lastName: body.lastName,
      birthOfDate: body.birthOfDate,
      email: body.email,
      role: body.role,
    }

    const userUpdated = await User.findByIdAndUpdate(userId, objToUpdate, {
      new: true,
    })

    if (!userUpdated) {
      throw {
        code: 400,
        name: 'BAD REQUEST',
        message: 'cannot update user',
      }
    }

    res.status(200).json({
      code: 200,
      status: 'OK',
      data: userUpdated,
    })
  } catch (e) {
    next(e)
  }
})

router.delete('/:userId', jwtAuth, async (req, res, next) => {
  const permission = ac.can(req.user.role).deleteAny('user')

  try {
    if (!permission.granted) {
      throw {
        code: 403,
        name: 'AccessForbidden',
        message: 'Access Forbidden for this endpoint',
      }
    }
    const user = await User.findById(req.params.userId)
    if (!user) {
      throw {
        code: 404,
        name: 'NOT FOUND',
        message: 'User not found',
      }
    }

    await User.findByIdAndDelete(req.params.userId)

    res.status(200).json({
      code: 200,
      status: 'OK',
      data: {
        message: 'User has been deleted',
      },
    })
  } catch (e) {
    next(e)
  }
})

module.exports = router
