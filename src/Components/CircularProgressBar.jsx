import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import "./CircularProgressBar.css";
function CircularProgressBar(props) {
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      if (percentage < props.percentage) {
        setPercentage(percentage + 1);
      }
    }, 15);
  }, [percentage]);

  return (
    <div className="ProgressBar">
      <CircularProgressbar
        strokeWidth={13}
        styles={{
          // Customize the root svg element
          root: {},
          // Customize the path, i.e. the "completed progress"
          path: {
            // Path color
            stroke: props.color,
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: "round",
            // Customize transition animation
            transition: "stroke-dashoffset 0.5s linear 0s",
            // Rotate the path
            transform: "rotate(0.25turn)",
            transformOrigin: "center center",
          },
          // Customize the circle behind the path, i.e. the "total progress"
          trail: {
            // Trail color
            stroke: "#d6d6d6",
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: "butt",
            // Rotate the trail
            transform: "rotate(0.25turn)",
            transformOrigin: "center center",
          },
          // Customize the text
          text: {
            // Text color
            fill: props.textColor,
            // Text size
            fontSize: "25px",
            fontWeight: "bolder",
          },
          // Customize background - only used when the `background` prop is true
          background: {
            fill: props.fillColor,
          },
        }}
        value={percentage}
        text={`${percentage}%`}
      >helo</CircularProgressbar>
    </div>
  );
}
export default CircularProgressBar;