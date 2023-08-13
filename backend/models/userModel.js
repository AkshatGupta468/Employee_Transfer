const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
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
    employee_id: {
      type: String,
      unique: true,
      required: [true, "Employee ID is required"],
    },
    phone_number: {
      type: String,
      required: [true, "Phone Number is required"],
      validate: [validator.isMobilePhone("en-IN")],
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
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
