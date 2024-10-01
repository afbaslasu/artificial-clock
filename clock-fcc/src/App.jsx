import React, { useState, useEffect, useRef } from "react";
import LengthControl from "./components/LengthControl";
import Timer from "./components/Timer";
import TimerControl from "./components/TimerControl";
import "./styles/App.css";
import {
  FaArrowDown,
  FaArrowUp,
  FaPlay,
  FaPause,
  FaRedo,
} from "react-icons/fa"; // <-- Add this import!

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerState, setTimerState] = useState("stopped");
  const [timerType, setTimerType] = useState("Session");
  const [timer, setTimer] = useState(1500); // Initial timer in seconds
  const [alarmColor, setAlarmColor] = useState({ color: "white" });
  const intervalRef = useRef(null);
  const audioBeep = useRef(null);

  useEffect(() => {
    if (timerState === "running") {
      intervalRef.current = setInterval(() => {
        decrementTimer();
        phaseControl();
      }, 1000);
    } else if (timerState === "stopped") {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [timerState, timer]);

  const lengthControl = (type, value, currentLength) => {
    if (timerState === "stopped") {
      if (type === "break") {
        if (value === "-" && currentLength > 1) {
          setBreakLength(currentLength - 1);
        } else if (value === "+" && currentLength < 60) {
          setBreakLength(currentLength + 1);
        }
      } else if (type === "session") {
        if (value === "-" && currentLength > 1) {
          setSessionLength(currentLength - 1);
          setTimer((currentLength - 1) * 60);
        } else if (value === "+" && currentLength < 60) {
          setSessionLength(currentLength + 1);
          setTimer((currentLength + 1) * 60);
        }
      }
    }
  };

  const timerControl = () => {
    if (timerState === "stopped") {
      setTimerState("running");
    } else {
      setTimerState("stopped");
    }
  };

  const decrementTimer = () => {
    setTimer((prevTimer) => prevTimer - 1);
  };

  const phaseControl = () => {
    if (timer < 0) {
      audioBeep.current.play();
      if (timerType === "Session") {
        setTimerType("Break");
        setTimer(breakLength * 60);
      } else {
        setTimerType("Session");
        setTimer(sessionLength * 60);
      }
    }

    warning(timer);
  };

  const warning = (timeLeft) => {
    if (timeLeft <= 60) {
      setAlarmColor({ color: "#a50d0d" });
    } else {
      setAlarmColor({ color: "white" });
    }
  };

  const reset = () => {
    setTimerState("stopped");
    setTimerType("Session");
    setBreakLength(5);
    setSessionLength(25);
    setTimer(1500);
    setAlarmColor({ color: "white" });
    audioBeep.current.pause();
    audioBeep.current.currentTime = 0;
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  return (
    <div className="container">
      <div className="main-title">25 + 5 Clock</div>
      <div className="length-controls">
        <LengthControl
          title="Break Length"
          titleID="break-label"
          lengthID="break-length"
          length={breakLength}
          incrementID="break-increment"
          decrementID="break-decrement"
          onClick={(value) => lengthControl("break", value, breakLength)}
          incrementIcon={<FaArrowUp />}
          decrementIcon={<FaArrowDown />}
        />
        <LengthControl
          title="Session Length"
          titleID="session-label"
          lengthID="session-length"
          length={sessionLength}
          incrementID="session-increment"
          decrementID="session-decrement"
          onClick={(value) => lengthControl("session", value, sessionLength)}
          incrementIcon={<FaArrowUp />}
          decrementIcon={<FaArrowDown />}
        />
      </div>
      <Timer
        timerLabel={timerType}
        timeLeft={formatTime(timer)}
        alarmColor={alarmColor}
      />
      <TimerControl
        startStop={timerControl}
        reset={reset}
        playIcon={<FaPlay />}
        pauseIcon={<FaPause />}
        resetIcon={<FaRedo />}
        timerState={timerState}
      />
      <audio
        id="beep"
        preload="auto"
        ref={audioBeep}
        src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
      />
      <h2 className="author">Design by <span className="author-name">Ismail Ibadehin</span></h2>
    </div>
  );
}

export default App;
