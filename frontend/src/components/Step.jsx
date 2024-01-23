import React from "react";
import "../styles/Step.css";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Step() {
  return (
    <>
      <div className="mainDiv">
        <div className="flowDiv">
          <Player
            autoplay
            loop
            src={require("../AnimationRoad.json")}
            style={{ height: "100px", width: "100px" }}
          ></Player>
        </div>
      </div>
    </>
  );
}
