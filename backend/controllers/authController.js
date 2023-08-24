const { promisify } = require("util")
const User = require("./../models/userModel")
const jwt = require("jsonwebtoken")
const catchAsync = require("./../utils/catchAsync")
const AppError = require("./../utils/appError")
const Email = require("./../utils/email")
const crypto = require("crypto")

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id)
  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }
  if (process.env.NODE_ENV === "production") cookieOption.secure = true
  res.cookie("jwt", token, cookieOption)
  //removing password from output
  user.password = undefined
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  })
}

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    location: req.body.location,
    phone_number: req.body.phone_number,
  });
  const url = "http://www.google.com";
  await new Email(newUser, url).sendWelcome();
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  //checking if email and password exist
  if (!email) {
    return next(new AppError(400, {
      email: {
        name: 'REQ_EMAIL',
        message: "Please provide an email id."
      }
    }
      ))
  }
  if (!password) {
    return next(new AppError(400, {
      password: {
        name: 'REQ_PASSWORD',
        message: "Please provide a password."
      }
    }
      ))
  }

  //checking if user exists and password is correct
  const user = await User.findOne({ email }).select("+password")
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError(401, {
      email: {
        name: 'INVALID_EMAIL_PASSWORD',
        message: "Incorrect email or password"
      },
      password: {
        name: 'INVALID_EMAIL_PASSWORD',
        message: "Incorrect email or password"
      }
    }));
  }
  //If everythimg is OK, send the token to client
  createSendToken(user, 200, res)
})

exports.protect = catchAsync(async (req, res, next) => {
  let token
  // Getting token from client and checking if it exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]
  }
  if (!token) {
    return next(
      new AppError(401, {
        misc: {
          name: 'NOT_LOGGED_IN',
          message:"You are not loggen in. Please log in to get access"
        }
      })
    )
  }

  //verification of the token
  //promisifying the verify function(using util library)
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  //checking if the user still exists(token exists but user is deleted)s
  const freshUser = await User.findById(decoded.id)
  if (!freshUser) {
    return next(
      new AppError(401, {
        misc: {
          name: 'USER_DELETED',
          message: 'The user belonging to the token no longer exists',
        },
      })
    )
  }

  //checking if the user has changed the password after token was created
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(401, {
        misc: {
          name: 'USER_PASSWORD_CHANGED',
          message: 'User recently changed password! Please log in again.',
        },
      })
    )
  }
  //if everything's fine, granting access to the protected route
  req.user = freshUser
  next()
})

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
         new AppError(403, {
          misc: {
            name: 'UNAUTHORIZED',
            message: 'You do not have permission to perform this action',
          },
        })
      )
    }
    next()
  }
}
exports.forgotPassword = catchAsync(async (req, res, next) => {
  /*User will send a post request with his email to a forgotPassword route. This will create a reset token and will be send to the email address provided.
   */

  //Getting user based on the Posted Email
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return next(new AppError(404, {
        email: {
          name: 'INVALID_EMAIL',
          message: 'There is no user with that email address',
        },
      }))
  }
  //Generating a random reset token
  const resetToken = user.createPasswordResetToken()
  await user.save({ validateBeforeSave: false })

  //Sending it to user's email
  try {
    const resetURL = `${req.prtocol}://${req.get(
      "host"
    )}/api/v1/users/reserPassword/${resetToken}`

    const message = `Forgot your password? Submit a PATCH request with your new Password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email.`

    await new Email(user, resetURL).sendPasswordReset()
    res.status(200).json({
      status: "success",
      message: "message sent to email",
    })
  } catch (error) {
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save({ validateBeforeSave: false })

    return next(
     new AppError(500, {
        email: {
          name: 'MAIL_NOT_SENT',
          message: 'There was a error sending mail',
        },
      })
    )
  }
})

exports.resetPassword = catchAsync(async (req, res, next) => {
  /*User now sends that token from his email along with his password to update the password
   */
  //Get user based on the token(Note: in db reset token is stored with encryption)
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex")

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  })

  //If the user exists and token is not expired, set the new password
  if (!user) {
    return next(new AppError(400, {
        misc: {
          name: 'INVALID_TOKEN',
          message: 'Token is invalid or has expired',
        },
      }))
  }
  user.password = req.body.password
  user.passwordConfirm = req.body.passwordConfirm
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined
  await user.save()

  //Update changedPasswordAt property for the user

  //Log the user in, send the JST to the client
  createSendToken(user, 200, res)
})

exports.updatePassword = catchAsync(async (req, res, next) => {
  //Get the user from the collection
  const user = await User.findById(req.user.id).select("+password")
  //Check if the Posted current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next( new AppError(403, {
        password: {
          name: 'INVALID_PASSWORD',
          message: 'The currenet password entered is incorrect',
        },
      }))
  }
  //If so, update the password
  user.password = req.body.password
  user.passwordConfirm = req.body.passwordConfirm
  await user.save()

  //Log the user in, send JWT
  createSendToken(user, 200, res)
})
