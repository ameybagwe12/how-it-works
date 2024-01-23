import React, { useState } from "react";
import "../styles/Home.css";
import Step from "./Step";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Home() {
  const [addStepNumber, setAddStepNumber] = useState("");
  const [deleteStepNumber, setDeleteStepNumber] = useState("");

  const handleAddStepNumberChange = (event) => {
    setAddStepNumber(event.target.value);
    console.log(addStepNumber);
  };

  const handleDeleteStepNumberChange = (event) => {
    setDeleteStepNumber(event.target.value);
    console.log(deleteStepNumber);
  };

  // You can use the addStepNumber and deleteStepNumber variables to pass values to your API

  return (
    <>
      <div className="titleDiv">
        <h1 className="title">How It Works</h1>
      </div>
      <div className="btnModify">
        <div className="innerBtn">
          <div className="stepDiv" onClick={() => console.log(addStepNumber)}>
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
              id="add-step-number"
              label="Add Step"
              type="number"
              value={addStepNumber}
              onChange={handleAddStepNumberChange}
              InputLabelProps={{
                shrink: true,
              }}
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
