const mongoose = require("mongoose");

const treeSchema = new mongoose.Schema(
  {
    species: {
      type: String,
      required: [true, "species is required"],
    },

    
    streetLocality: {
        type: String,
        required: [true, "streetLocality is required"],
    },
    city: {
        type: String,
        required: [true, "city is required"],
    },
    state: {
        type: String,
        required: [true, "state is required"],
    },
    pincode: {
        type: String,
        required: [true, "pincode is required"],
    },

    soil: {
      type: String,
      required: [true, "soil type is required"],
    },

    picture: {
      type: String,
      required: [true, "picture is required"]
    },

    status: {
      type: String,
      required: [true, "Status document is required"],
    },

    date: {
      type: Date,
      // default: () => new Date.now(),
      default: Date.now(),
      required: true
    },
    // user_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "employee_model",
    // }
}) 

const tree_model = mongoose.model("Tree", treeSchema);

module.exports = tree_model;