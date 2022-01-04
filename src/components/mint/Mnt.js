import React, { useEffect, useState } from "react";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import "./mint.css";
import { percentage } from "./../Percentage";
import ethereum from "../../assets/ethereum.png";
import {
  totalSupply,
  presaleLive,
  maxCount,
  saleLive,
  mainsaleValue,
  presaleValue,
} from "../../Contractor/SmapleCourt";

import angry from "../../assets/angry.png";
import RingLoader from "react-spinners/RingLoader";

const Mint = () => {
  const [count, setCount] = useState(1);
  const [available, setAvailable] = useState(null);
  const [preSaleBool, setPreSaleBool] = useState(false);
  const [preSaleValue, setpreSaleValue] = useState(0.061);
  const [max, setMax] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainSaleBool, setMainSaleBool] = useState(false);
  const [mainSaleValue, setMainSaleValue] = useState(0.061);
  useEffect(() => {
    totalSupply().then((e) => {
      setAvailable(e);
    });
    presaleLive().then((e) => {
      setPreSaleBool(e);
    });
    presaleValue().then((e) => {
      const dec = parseInt(e._hex, 16);
      setpreSaleValue((prev) => (dec === 0 ? prev : dec));
    });
    maxCount().then((e) => {
      const dec = parseInt(e._hex, 16);
      setMax(dec);
      setLoading(false);
    });
    saleLive().then((e) => {
      setMainSaleBool(e);
    });
    mainsaleValue().then((e) => {
      const dec = parseInt(e._hex, 16);
      setMainSaleValue((prev) => (dec === 0 ? prev : dec));
    });
  }, []);

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
      {loading ? (
        <div className="loading">
          <RingLoader color="#FF1700" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Progress
            percent={100 - Math.floor(percentage(max, available))}
            strokeWidth={15}
            status="error"
            theme={{
              error: {
                symbol: " ",
                color: "green",
              },
            }}
          />
          <h2 className="available">
            {available} of {max} available
          </h2>
          <div className="mint-container">
            <section className="sample-container">
              <img src={angry} className="sample" />
            </section>
            <section className="mint-content">
              <div className="mint-add">
                <p className="sale">
                  {preSaleBool && "Pre Sale"}
                  {!preSaleBool && mainSaleBool && "Main Sale"}
                </p>
                <div className="mint-add-content">
                  <img src={ethereum} className="ethereum" />
                  <p
                    className="ethereum-value"
                    style={{ fontSize: "30px", textTransform: "capitalize" }}
                  >
                    {preSaleBool && preSaleValue}
                    {!preSaleBool && mainSaleBool && mainSaleValue}/mint
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
                    {preSaleBool && preSaleValue * count}
                    {!preSaleBool && mainSaleBool && mainSaleValue * count}
                    /Total
                  </p>
                </div>
                <button
                  disabled={!preSaleBool}
                  className={preSaleBool ? "" : "disable"}
                  onClick={() => {
                    console.log("hello");
                  }}
                >
                  MINT
                </button>
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default Mint;
