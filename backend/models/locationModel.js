const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
      cityNumber:{
        type: Number,
        required: [true,"City Number is Required"],
        unique: true
      },
      cityName:{
        type: String,
        required: [true,"City Name is Required"],
        unique  : true
      }
});

const locationModel = mongoose.model("location", locationSchema);
module.exports = locationModel;
