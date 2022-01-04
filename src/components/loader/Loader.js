import React, { lazy } from "react";
import SplitText from "../SplitText";
import "./Loader.css";
import PacmanLoader from "react-spinners/PacmanLoader";

// const SplitText = lazy(() => import("../SplitText"));

const Loader = () => {
  return (
    <div className="loader">
      <PacmanLoader color="#3E8E7E" loading={true} size={50} />
      <p style={{ marginTop: "60px", marginLeft: "50px" }}>
        <SplitText copy="welcome wonderer" role="heading" />
        <span
          className="bar"
          style={{
            animation: "display 1s forwards infinite",
            animationDelay: "1s",
          }}
        >
          __
        </span>
      </p>
    </div>
  );
};

export default Loader;
