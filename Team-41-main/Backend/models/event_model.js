const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name of the event is required"],
  },
  description: {
    type: String,
    required: [true, "Description of the event is required"],
  },
  startDate: {
    type: Date,
    required: [true, "Start date of the event is required"],
  },
  endDate: {
    type: Date,
    required: [true, "End date of the event is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event_model = mongoose.model("Event_model", eventSchema);

module.exports = Event_model;
