import React from "react";
import "../styles/Home.css";
import Step from "./Step";

export default function Home() {
  return (
    <>
      <div className="titleDiv">
        <h1 className="title">How It Works</h1>
      </div>
      <div>
        <Step />
      </div>
    </>
  );
}
