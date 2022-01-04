import React, { useState, useEffect } from "react";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import Parallax from "../components/parallax/Parallax";
import parallax from "./../components/parallax";
import song from "../assets/audio.mp3";
import "./Main.css";
import Footer from "./Footer";
import angry from "../assets/angry.png";
import TextComponent from "./../components/TextComponent";
import Mint from "./../components/mint/Mnt";

const Main = (props) => {
  const [play, setPlay] = useState(false);
  const [showMint, setShowMint] = useState(false);
  useEffect(() => {
    parallax();
  }, []);
  const showMintHandler = () => {
    setShowMint(true);
  };
  const playAudio = (type) => {
    const audio = document.getElementById("playAudio");
    if (type === "start") {
      audio.play();
      setPlay(true);
    } else {
      audio.pause();
      setPlay(false);
    }
  };

  return (
    <div id="parallax">
      <img src={angry} className="angry" alt="angry" />
      <Parallax />
      <div className="container">
        {play ? (
          <VolumeMuteIcon className="mute" onClick={() => playAudio("stop")} />
        ) : (
          <VolumeOffIcon className="mute" onClick={() => playAudio("start")} />
        )}

        <audio autoPlay={true} loop id="playAudio" muted={false}>
          <source src={song} />
        </audio>
        {showMint ? (
          <Mint />
        ) : (
          <TextComponent showMintHandler={showMintHandler} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Main;
