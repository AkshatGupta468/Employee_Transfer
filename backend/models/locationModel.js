const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    ddoId: {
        type: String,
        required: [true, "DDO Id is Required!"],
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
