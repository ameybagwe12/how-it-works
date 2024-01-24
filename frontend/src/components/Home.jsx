import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Home.css";
import Step from "./Step";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Home() {
  const [addStep, setAddStep] = useState({
    stepNum: "",
    stepText: "",
  });

  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    // Check if the viewport width is less than 600px
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 600);
    };

    // Initial check on mount
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [deleteStepNumber, setDeleteStepNumber] = useState("");
  const [steps, setSteps] = useState([]);
  const [addError, setAddError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  const handleAddStepNumberChange = (event) => {
    setAddStep({
      ...addStep,
      stepNum: event.target.value,
    });

    // Reset the error state when the stepNum is changed
    setAddError(false);
  };

  const handleAddStepTextChange = (event) => {
    setAddStep({
      ...addStep,
      stepText: event.target.value,
    });
  };

  const handleDeleteStepNumberChange = (event) => {
    setDeleteStepNumber(event.target.value);

    // Reset the error state when the deleteStepNumber is changed
    setDeleteError(false);
  };

  const handleAddStepClick = async () => {
    try {
      // Check if the step number already exists
      const existingStep = steps.find(
        (step) => step.stepNumber === +addStep.stepNum
      );
      if (existingStep) {
        setAddError(true);
        return;
      }

      // Check if any field is not filled
      if (!addStep.stepNum || !addStep.stepText) {
        setAddError(true);
        return;
      }

      // Send data to the backend using axios
      await axios.post("http://localhost:5000/add-step", addStep);

      // Fetch updated steps after adding a new step
      const response = await axios.get("http://localhost:5000/get-steps");
      console.log("====================================");
      console.log(response);
      console.log("====================================");
      setSteps(response.data);

      // Reset the input fields after successful addition
      setAddStep({
        stepNum: "",
        stepText: "",
      });

      // Reset the error state after successful addition
      setAddError(false);
    } catch (error) {
      console.error("Error adding step:", error);
    }
  };

  const handleDeleteStepClick = async () => {
    try {
      // Check if the step number exists before attempting to delete
      const existingStep = steps.find(
        (step) => step.stepNumber === +deleteStepNumber
      );
      if (!existingStep) {
        setDeleteError(true);
        return;
      }

      // Send data to the backend using axios
      await axios.delete(
        `http://localhost:5000/delete-step/${deleteStepNumber}`
      );

      // Fetch updated steps after deleting a step
      const response = await axios.get("http://localhost:5000/get-steps");
      setSteps(response.data);

      // Reset the input field after successful deletion
      setDeleteStepNumber("");

      // Reset the error state after successful deletion
      setDeleteError(false);
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
      <div className="homeRoot">
        <div className="titleDiv">
          <h1 className="title">How It Works</h1>
        </div>
        <div className="btnModify">
          <div className="innerBtn">
            <div className="btn" onClick={handleAddStepClick}>
              <ion-icon name="add-circle-sharp"></ion-icon>
            </div>
            <Box
              className="boxText"
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                error={addError}
                id="add-step-number"
                label="Add Step"
                type="number"
                value={addStep.stepNum}
                onChange={handleAddStepNumberChange}
                InputLabelProps={{
                  shrink: true,
                }}
                helperText={
                  addError
                    ? "Step number already exists or fields are not filled"
                    : ""
                }
              />
              <TextField
                required
                error={addError}
                value={addStep.stepText}
                onChange={handleAddStepTextChange}
                label="Add Description"
                id="add-step-text"
                helperText={addError ? "Fields are not filled" : ""}
              />
            </Box>
          </div>

          <div className="innerBtn">
            <div className="btn" onClick={handleDeleteStepClick}>
              <ion-icon name="trash-sharp"></ion-icon>
            </div>
            <Box
              className="boxText2"
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                error={deleteError}
                id="delete-step-number"
                label="Delete Step"
                type="number"
                value={deleteStepNumber}
                onChange={handleDeleteStepNumberChange}
                InputLabelProps={{
                  shrink: true,
                }}
                helperText={
                  deleteError ? "Step does not exist or add a step field" : ""
                }
              />
            </Box>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="rootStep">
            {/* Render the list of steps */}
            {steps.map((step, index) => (
              <React.Fragment key={step._id}>
                <div className="stepGroup">
                  <Step step={step} />
                  {index < steps.length - 1 && (
                    <Player
                      autoplay
                      loop
                      src={
                        isMobileView
                          ? require("../AnimationDown.json")
                          : require("../AnimationArrow.json")
                      }
                      style={{
                        height: "100px",
                        width: "100px",
                      }}
                    ></Player>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
