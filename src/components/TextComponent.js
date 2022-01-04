import React, { useState } from "react";
import SplitText from "./SplitText";

const TextComponent = (props) => {
  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          console.log(result);
          props.showMintHandler();
        });
    }
  };
  return (
    <div className="textContainer">
      <p>
        <SplitText
          copy="Connect your wallet. Your journey will start."
          role="heading"
        />
        <span className="bar">__</span>
      </p>

      <button className="button" onClick={connectWalletHandler}>
        CONNECT YOUR WALLET
      </button>
    </div>
  );
};

export default TextComponent;
