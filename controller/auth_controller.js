const router = require('express').Router()
const User = require('../model/user_model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const constant = require('../utils/constant')
const nodemailer = require('nodemailer')

router.post('/login', async (req, res, next) => {
  try {
    const body = req.body

    let user = await User.findOne({ email: body.email })

    console.log(user)

    const auth =
      user === null ? false : await bcrypt.compare(body.password, user.password)

    if (!(user && auth)) {
      throw {
        code: 401,
        name: 'AuthError',
        message: 'Invalid username and password',
      }
    }

    const userLogged = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      birthOfDate: user.birthOfDate,
      email: user.email,
      role: user.role,
    }

    const token = jwt.sign(userLogged, constant.JWT_TOKEN, { expiresIn: '1h' })
    const refreshToken = jwt.sign(userLogged, constant.JWT_TOKEN_REFRESH, {
      expiresIn: '72h',
    })

    res.status(200).json({
      code: 200,
      status: 'OK',
      data: {
        token,
        refreshToken,
      },
    })
  } catch (e) {
    next(e)
  }
})

router.post('/register', async (req, res, next) => {
  try {
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
      role: 'superadmin',
      password: passwordHash,
    })

    const user = await userToSave.save()

    const userLogged = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      birthOfDate: user.birthOfDate,
      email: user.email,
      role: user.role,
    }

    const token = jwt.sign(userLogged, constant.JWT_TOKEN, {
      expiresIn: '1h',
    })
    const refreshToken = jwt.sign(userLogged, constant.JWT_TOKEN_REFRESH, {
      expiresIn: '72h',
    })

    res.status(200).json({
      code: 200,
      status: 'OK',
      data: {
        token,
        refreshToken,
      },
    })
  } catch (e) {
    next(e)
  }
})

router.post('/forgot-password', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      throw {
        code: 404,
        name: 'User Not Found',
        message: 'User not found',
      }
    }

    console.log(user.id)

    const token = jwt.sign(
      {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      constant.JWT_TOKEN_RESET_PASSWORD,
      {
        expiresIn: '30m',
      }
    )

    await User.findByIdAndUpdate(
      { _id: user._id },
      { resetPasswordToken: token },
      { new: true }
    )

    const urlToken = `http://localhost:3000/reset-password/${token}`

    const mailOptions = {
      from: 'User Management',
      to: req.body.email,
      subject: 'Reset Password',
      html: `<p>Silakan melakukan reset password dengan mengklik <a href="${urlToken}">Link ini</a></p><p>Link berlaku selama 30 menit</p>`,
    }

    const transporter = nodemailer.createTransport({
      service: constant.EMAIL_SERVICE,
      auth: {
        user: constant.EMAIL_USER,
        pass: constant.EMAIL_PASS,
      },
    })

    const sendEmail = await transporter.sendMail(mailOptions)
    if (!sendEmail) {
      throw {
        code: 400,
        name: 'SEND FAILED',
        message: 'Send email failed',
      }
    }

    res.status(200).json({
      code: 200,
      status: 'OK',
      data: {
        message: 'Reset link sent successfully',
      },
    })
  } catch (e) {
    next(e)
  }
})

module.exports = router
