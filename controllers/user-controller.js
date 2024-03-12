const { UserModel, BookModel } = require("../models");
const userModels = require("../models/user-models");
exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find();
  if (users.length == 0) {
    return res.status(400).json({
      success: false,
      message: "User Not Registered Yet",
    });
  }
  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
};
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById({ _id: id });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "user with id " + id + " Not found",
    });
  }
  return res.status(200).json({
    success: false,
    message: "User fetched successfully",
    data: user,
  });
};
exports.addUser = async (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;
  //  console.log(
  //     "name ",
  //     name,
  //     "surename",
  //     surname,
  //     "email",
  //     email,
  //     "subscriptionType",
  //     subscriptionType,
  //     "subscriptionDate",
  //     subscriptionDate
  //   );
  const newUser = await UserModel.create({
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });

  return res.status(201).json({
    success: true,
    message: "User Added Succesfully",
    data: newUser,
  });
};
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  console.log(data);
  if (!data) {
    return res.status(404).json({
      success: false,
      message: "Invalid Request ",
    });
  }
  const user = await UserModel.findByIdAndUpdate(
    { _id: id },
    { $set: { ...data } },
    {
      new: true,
    }
  );
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Invalid User ID",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Data Updated Successfully",
    data: user,
  });
};
exports.deleteUserById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ success: false, message: "id not found" });
  }
  const user = await UserModel.findByIdAndDelete({ _id: id });
  if (!user) {
    return res.status(404).json({ success: false, message: "INVALID ID" });
  }
  const users = await UserModel.find();
  return res.status(200).json({
    success: true,
    message: "user deleted successfully",
    data: users,
  });
};

// (req, res) => {
//   const { id } = req.params;
//   const user = users.find((each) => each.id == id);
//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "user not Found",
//     });
//   }
//   const getDateinDays = (data = "") => {
//     let date;
//     if (data == "") {
//       date = new Date();
//     } else {
//       date = new Date(data);
//     }
//     // console.log(date, "date  ", Math.floor(date / (1000 * 60 * 24)));
//     let days = Math.floor(date / (1000 * 60 * 60 * 24));
//     return days;
//   };
//   const subscriptionDate = (date) => {
//     if (user.subscriptionType === "Basic") {
//       date = date + 90;
//     } else if (user.subscriptionType === "Standard") {
//       date = date + 180;
//     } else if (user.subscriptionType === "Premium") {
//       date = date + 360;
//     }
//     return date;
//   };
//   let returnDate = getDateinDays(user.returnDate);
//   let currentDate = getDateinDays();
//   let subscriptionDateindays = getDateinDays(user.subscriptionDate);
//   let subscriptionExpire = subscriptionDate(subscriptionDateindays);

//   console.log(user.returnDate, "ser.returnDate", returnDate);
//   console.log("currentDate", currentDate);
//   console.log(
//     subscriptionDateindays,
//     "user.subscriptionDate",
//     user.subscriptionDate
//   );
//   console.log(subscriptionExpire, "subscriptionExpire");

//   const data = {
//     ...user,
//     IssubscriptionExpire: subscriptionExpire <= currentDate,
//     DayLeftExpiration:
//       subscriptionExpire <= currentDate ? 0 : subscriptionExpire - currentDate,
//     fine:
//       returnDate < currentDate
//         ? subscriptionExpire <= currentDate
//           ? 100
//           : 50
//         : 0,
//   };
//   res.status(200).json({
//     success: true,
//     message: "book issued",
//     data: data,
//   });
//   console.log(data);

exports.subscriptionDetailsById = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById({ _id: id });
  console.log("hoo");
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not Found",
    });
  }
  const getDateinDays = (data = "") => {
    let date;
    if (data == "") {
      date = new Date();
    } else {
      date = new Date(data);
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };
  const subscriptionDate = (date) => {
    if (user.subscriptionType === "Basic") {
      date += 90;
    } else if (user.subscriptionType === "Standard") {
      date += 180;
    } else if (user.subscriptionType === "Premium") {
      date += 360;
    }
    return date;
  };
  let returnDate = getDateinDays(user.returnDate);
  let currentDate = getDateinDays();
  let subscriptionDateindays = getDateinDays(user.subscriptionDate);
  let subscriptionExpire = subscriptionDate(subscriptionDateindays);
  const data = {
    ...user,
    IsSubscriptionExpired: subscriptionExpire <= currentDate,
    fine:
      returnDate <= currentDate
        ? subscriptionExpire <= currentDate
          ? 100
          : 50
        : 0,
  };
  res.status(200).json({
    success: true,
    message: "book issued",
    data: data,
  });
  console.log(data);
};
