import React from "react";

function TimerControl({
  startStop,
  reset,
  playIcon,
  pauseIcon,
  resetIcon,
  timerState,
}) {
  return (
    <div className="timer-control">
      <button id="start_stop" onClick={startStop}>
        {timerState === "stopped" ? playIcon : pauseIcon}
      </button>
      <button id="reset" onClick={reset}>
        {resetIcon}
      </button>
    </div>
  );
}

export default TimerControl;
