const Users = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const url = process.env.DATABASE;
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
    // console.log(newObj);
  });
  return newObj;
};

exports.userInformationValidator = catchAsync(async (req, res, next) => {
  if ((!req.user.name)  || (!req.user.location)  || (!req.user.preferredLocations)){
    return next(
      new AppError(400, {
        misc: {
          name: "Incomplete User Information",
          message:
            "Name, Location, Preferred LOcations are required to complete your profile and hence perform this action.",
        },
      })
    );
  }
  next();
});

exports.getDetails = catchAsync(async (req, res) => {
  const user = await Users.findById(req.user._id);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(400, {
        misc: {
          name: "WRONG ROUTE",
          message:
            "This route is not for password update. Please use updatePassword route",
        },
      })
    );
  }
  //Filtering out unwanted fields that we dont want user to update
  const filteredBody = filterObj(
    req.body,
    "name",
    "location",
    "photo",
    "preferredLocations",
    "deactivated"
  );
  //we can use findByIdAndUpdate as we are dealing with non sensitive data
  const updatedUser = await Users.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  //console.log(updatedUser);
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.getEmployees = catchAsync(async (req, res, next) => {
  const currUser = await Users.findById(req.user._id);
  console.log(currUser);
  const curLocation = currUser.location;
  const users = await Users.find().where("location").in(currUser.preferredLocations)
  .where("preferredLocations").equals(curLocation).where("deactivated").equals(false);
   res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users
    },
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await Users.find().where("deactivated").equals(false);

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.postImmediateProfile = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm || req.body.email) {
    return next(
      new AppError(400, {
        misc: {
          name: "WRONG ROUTE",
          message:
            "This route is not for password update. Please use updatePassword route",
        },
      })
    );
  }
  //Filtering out unwanted fields that we dont want user to update
  const filteredBody = filterObj(
    req.body,
    "name",
    "location",
    "photo",
    "preferredLocations",
  );

  if ((!filteredBody.name) || (!filteredBody.location) || (!filteredBody.preferredLocations)){
    return next(
      new AppError(400, {
        misc: {
          name: "Required Field",
          message:
            "Name, Location, PreferredLocations are Required Fields.",
        },
      })
    )
  }
  //we can use findByIdAndUpdate as we are dealing with non sensitive data
  const updatedUser = await Users.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });
  //console.log(updatedUser);
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
})



