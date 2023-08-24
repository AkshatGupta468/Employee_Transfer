const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required!"],
  },
  email: {
    type: String,
    required: [true, "Email is Required!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Invalid Email!"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Password is Required!"],
    minlength: [8, "Password too Short! Use 8 Characters Atleast"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password
      },
      message: "Passwords are not the same!",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,

  /*
    phone_number: {
      type: String,
      required: [true, "Phone Number is required"],
      //validate: [validator.isMobilePhone("en-IN")],
    },
    location: {
      type: String,
      required: [true, "Please enter your location"],
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId("62d330992807e471b7032b30"),
    },
  },
  {
    timestamps: true,
  }
  */
})

//to encrypt the password if a new password has been created or password is modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  //hashing using bcrypt
  this.password = await bcrypt.hash(this.password, 12)

  this.passwordConfirm = undefined
  next()
})

//to update the passwordChangedAt property if the password has been modified
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next()
  //subtracting 1sec because sometimes saving in a database is slower than creating a token. If token is created before, user will not be able to login using the new token
  this.passwordChangedAt = Date.now() - 1000
  next()
})
//Instance Methods: available on all documents of a collection

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    )
    return JWTTimestamp < changedTimestamp
  }
  return false
}

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex")

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

  //10 min reset timer
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000

  return resetToken
}

const UserModel = mongoose.model("User", userSchema)
module.exports = UserModel
