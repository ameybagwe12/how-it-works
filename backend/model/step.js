const mongoose = require("mongoose");

const stepSchema = new mongoose.Schema({
  stepNumber: {
    type: Number,
    required: true,
  },
  stepsText: {
    type: String,
    required: true,
  },
});

const Steps = mongoose.model("Step", stepSchema);

module.exports = Steps;
