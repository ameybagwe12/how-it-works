import React, { useState } from "react";
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

  return (
    <>
      <div className="titleDiv">
        <h1 className="title">How It Works</h1>
      </div>
      <div className="btnModify">
        <div className="innerBtn">
          <div className="stepDiv" onClick={() => console.log(addStep)}>
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
          <div
            className="stepDiv"
            onClick={() => console.log(deleteStepNumber)}
          >
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
        <Step />
      </div>
    </>
  );
}
