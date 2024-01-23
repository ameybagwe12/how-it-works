const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Steps = require("./model/Step.js");

mongoose.set("strictQuery", false);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(Steps);

mongoose
  .connect("mongodb://localhost:27017/howItWorks")
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

app.post("/add-step", async (req, res) => {
  try {
    const { stepNum, stepText } = req.body;

    // Create a new step
    const newStep = new Steps({
      stepNumber: stepNum,
      stepsText: stepText,
    });

    // Save the new step to the database
    await newStep.save();

    // Send a success response
    res.status(201).json({ message: "Step added successfully" });
  } catch (error) {
    console.error("Error adding step:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/get-steps", async (req, res) => {
  try {
    // Fetch all steps from the database
    const steps = await Steps.find().sort({ stepNumber: 1 });

    // Send the steps as a response
    res.json(steps);
  } catch (error) {
    console.error("Error fetching steps:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/delete-step/:stepNumber", async (req, res) => {
  try {
    const stepNumberToDelete = req.params.stepNumber;

    // Delete the step from the database based on stepNumber
    await Steps.deleteOne({ stepNumber: stepNumberToDelete });

    // Send a success response
    res.json({ message: `Step ${stepNumberToDelete} deleted successfully` });
  } catch (error) {
    console.error("Error deleting step:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen("5000", () => {
  console.log("Listening on Port 5000");
});
