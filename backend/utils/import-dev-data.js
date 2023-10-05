const mongoose = require("mongoose")
const fs = require("fs")
const Locations = require('../models/locationModel');
const dotenv = require("dotenv")
dotenv.config()

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
)


mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection to Database is successful")
  })
  .catch((err) => {
    console.log("Unable to Connect to Database", err)
  })


  const locations = JSON.parse(
    fs.readFileSync('utils/locationsData.json', 'utf-8')
  );
  const importData = async () => {
    try {
      await Locations.create(locations);
      console.log('Data Successfully Loaded');
    } catch (err) {
      console.log(err);
    }
    process.exit();
  };
  importData();

