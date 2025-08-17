// Graph.jsx
import React, { useState, useEffect, useRef } from "react";

// Hook to track window width
// const useWindowWidth = () => {
//   const [width, setWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => setWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return width;
// };

const Graph = ({ array, graphHeight }) => {
  // const width = useWindowWidth();
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create a ResizeObserver to watch the container
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const barWidth = 3;
  const numBars = Math.floor(width / barWidth);

  // Decide max bars based on screen width
  // const maxBars = Math.floor(width / 5); // 5px minimum per bar
  // const step = Math.ceil(array.length / maxBars); // pick every Nth element
  const step = Math.ceil(array.length / numBars); // pick every Nth element

  const bars = array
    .filter((_, i) => i % step === 0)
    .map((element, index) => {
      // const barWidth = Math.max(Math.floor(width / maxBars) - 2, 5); // bar width minus margin
      const style = {
        height: `${element}px`,
        width: `${barWidth}px`,
        marginRight: "2px",
        backgroundColor: "pink",
      };
      return <div key={index} style={style}></div>;
    });

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        alignItems: "flex-end",
        width: "100%",
        border: "2px solid black",
        padding: "5px",
        boxSizing: "border-box",
        overflow: "hidden",
        maxWidth: "500px",
        height: graphHeight,
      }}
    >
      {bars}
    </div>
  );
};

export default Graph;
