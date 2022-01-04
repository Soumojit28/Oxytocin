import React, { useState } from "react";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import "./mint.css";
import { percentage } from "./../Percentage";
import sample1 from "../../assets/sample1.png";
import sample2 from "../../assets/sample2.png";
import ethereum from "../../assets/ethereum.png";
import { totalSupply } from "./../../Contractor/SmapleCourt";
const Mint = () => {
  const [value, setValue] = useState(0.061);
  const [count, setCount] = useState(1);
  console.log("data");
  console.log(totalSupply());
  const decreaseCount = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  const increaseCount = () => {
    if (count < 2) {
      setCount((prev) => prev + 1);
    }
  };
  return (
    <div className="mint" style={{ padding: "40px" }}>
      <Progress
        percent={Math.floor(percentage(3333, 1667))}
        strokeWidth={15}
        status="error"
        theme={{
          error: {
            symbol: " ",
            color: "green",
          },
        }}
      />
      <h2>1667 of 3333 available</h2>
      <div className="mint-container">
        <section className="sample-container">
          <img src={sample2} className="sample" />
          <img src={sample1} className="sample" />
        </section>
        <section className="mint-content">
          <div className="mint-add">
            <div className="mint-add-content">
              <img src={ethereum} className="ethereum" />
              <p
                className="ethereum-value"
                style={{ fontSize: "30px", textTransform: "capitalize" }}
              >
                {value}/mint
              </p>
            </div>
            <div className="addButtons">
              <button className="addButton" onClick={decreaseCount}>
                -
              </button>
              <h4>{count}</h4>
              <button className="addButton" onClick={increaseCount}>
                +
              </button>
            </div>
          </div>
          {/* //////////////////// */}
          <div className="mint-total">
            <div className="mint-add-content">
              <img src={ethereum} className="ethereum ethereum-1" />
              <p
                className="ethereum-value"
                style={{ fontSize: "40px", textTransform: "capitalize" }}
              >
                {value * count}/Total
              </p>
            </div>
            <button>MINT</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Mint;
