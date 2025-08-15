// Graph.jsx
import React, { useState, useEffect } from "react";

// Hook to track window width
const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

const Graph = ({ array }) => {
  const width = useWindowWidth();

  // Decide max bars based on screen width
  const maxBars = Math.floor(width / 5); // 5px minimum per bar
  const step = Math.ceil(array.length / maxBars); // pick every Nth element

  const bars = array
    .filter((_, i) => i % step === 0)
    .map((element, index) => {
      const barWidth = Math.max(Math.floor(width / maxBars) - 2, 5); // bar width minus margin
      const style = {
        height: `${element / 3}px`,
        width: `${barWidth}px`,
        marginRight: "2px",
        backgroundColor: "pink",
      };
      return <div key={index} style={style}></div>;
    });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        width: "100%",
        height: "400px",
        border: "5px solid black",
        padding: "5px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {bars}
    </div>
  );
};

export default Graph;
