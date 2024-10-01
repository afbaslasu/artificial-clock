import React from "react";

function LengthControl({
  title,
  titleID,
  lengthID,
  length,
  incrementID,
  decrementID,
  onClick,
  incrementIcon,
  decrementIcon,
}) {
  return (
    <div className="length-control">
      <div id={titleID}>{title}</div>
      <div className="length-control-arrow">
        <button
          className="btn-level btn-level-arrow"
          id={decrementID}
          onClick={() => onClick("-")}
          value="-"
        >
          {decrementIcon}
        </button>
        <div className="btn-level" id={lengthID}>
          {length}
        </div>
        <button
          className="btn-level btn-level-arrow"
          id={incrementID}
          onClick={() => onClick("+")}
          value="+"
        >
          {incrementIcon}
        </button>
      </div>
    </div>
  );
}

export default LengthControl;
