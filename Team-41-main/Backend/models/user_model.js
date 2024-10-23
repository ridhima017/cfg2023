const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    // Add any email validation rules if required
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    // You may want to add more validation rules for password complexity
  },
  community_group: {
    type: String,
    required: [true, "Community is required"],
  },
  residentialPincode: {
    type: String,
    // required: [true, "Residential pincode is required"],
  },
});

const User_model = mongoose.model("User_model", userSchema);

module.exports = User_model;
