import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Home.css";
import Step from "./Step";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Home() {
  const [addStep, setAddStep] = useState({
    stepNum: "",
    stepText: "",
  });

  const [deleteStepNumber, setDeleteStepNumber] = useState("");
  const [steps, setSteps] = useState([]);

  const handleAddStepNumberChange = (event) => {
    setAddStep({
      ...addStep,
      stepNum: event.target.value,
    });
  };

  const handleAddStepTextChange = (event) => {
    setAddStep({
      ...addStep,
      stepText: event.target.value,
    });
  };

  const handleDeleteStepNumberChange = (event) => {
    setDeleteStepNumber(event.target.value);
  };

  const handleAddStepClick = async () => {
    try {
      // Send data to the backend using axios
      await axios.post("http://localhost:5000/add-step", addStep);

      // Fetch updated steps after adding a new step
      const response = await axios.get("http://localhost:5000/get-steps");
      setSteps(response.data);
    } catch (error) {
      console.error("Error adding step:", error);
    }
  };

  const handleDeleteStepClick = async () => {
    try {
      // Send data to the backend using axios
      await axios.delete(
        `http://localhost:5000/delete-step/${deleteStepNumber}`
      );

      // Fetch updated steps after deleting a step
      const response = await axios.get("http://localhost:5000/get-steps");
      setSteps(response.data);
    } catch (error) {
      console.error("Error deleting step:", error);
    }
  };

  useEffect(() => {
    // Fetch initial steps when the component mounts
    const fetchSteps = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get-steps");
        setSteps(response.data);
      } catch (error) {
        console.error("Error fetching steps:", error);
      }
    };

    fetchSteps();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <>
      <div className="titleDiv">
        <h1 className="title">How It Works</h1>
      </div>
      <div className="btnModify">
        <div className="innerBtn">
          <div className="stepDiv" onClick={handleAddStepClick}>
            <ion-icon name="add-circle-sharp"></ion-icon>
          </div>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              id="add-step-number"
              label="Add Step"
              type="number"
              value={addStep.stepNum}
              onChange={handleAddStepNumberChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              required
              value={addStep.stepText}
              onChange={handleAddStepTextChange}
              id="add-step-text"
              label="Add Description"
            />
          </Box>
        </div>

        <div className="innerBtn">
          <div className="stepDiv" onClick={handleDeleteStepClick}>
            <ion-icon name="trash-sharp"></ion-icon>
          </div>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              id="delete-step-number"
              label="Delete Step"
              type="number"
              value={deleteStepNumber}
              onChange={handleDeleteStepNumberChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </div>
      </div>
      <div>
        {/* Render the list of steps */}
        {steps.map((step) => (
          <Step key={step._id} step={step} />
        ))}
      </div>
    </>
  );
}
