const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  passwordChangedAt: Date,

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
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  //hashing using bcrypt
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});
//Instance Methods: available on all documents of a collection

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const UserModel = mongoose.model("User", userSchema);

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestam < changesTimestamp;
  }
  return false;
};

module.exports = UserModel;
