import React from "react";

function Timer({ timerLabel, timeLeft, alarmColor }) {
  return (
    <div className="timer" style={alarmColor}>
      <div className="timer-wrapper">
        <div id="timer-label">{timerLabel}</div>
        <div id="time-left">{timeLeft}</div>
      </div>
    </div>
  );
}

export default Timer;
