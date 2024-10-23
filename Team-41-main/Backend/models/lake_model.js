const mongoose = require("mongoose");

const LakeSchema = new mongoose.Schema({
  status: {
    type: String,
    required: [true, "Status is required"],
  },

    streetLocality: {
      type: String,
      required: [true, "Street/Locality is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    pincode: {
      type: String,
      required: [true, "Pincode is required"],
    },
  
  picture: {
    type: String,
    required: [true, "Picture is required"],
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Lake_model = mongoose.model("Lake_model", LakeSchema);

module.exports = Lake_model;
