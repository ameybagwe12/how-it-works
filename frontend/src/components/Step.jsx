import React from "react";
import "../styles/Step.css";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Step({ step }) {
  console.log("====================================");
  console.log(step);
  console.log("====================================");
  return (
    <>
      <div className="mainDiv scale-in-center">
        <div className="flowDiv">
          <div>
            <Player
              autoplay
              loop
              src={require("../AnimationRoad.json")}
              style={{
                height: "50px",
                width: "50px",
                paddingTop: 20,
              }}
            ></Player>
          </div>
          <div className="flowContent">
            <h4 style={{ textAlign: "center", margin: 0, color: "white" }}>
              Step {step.stepNumber}:
            </h4>
            <p style={{ margin: 0, color: "white" }}>{step.stepsText}</p>
          </div>
        </div>
      </div>
    </>
  );
}
