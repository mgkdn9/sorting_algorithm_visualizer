import React, { useState, useEffect, useRef } from "react";

const Graph = ({ array, graphHeight }) => {
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
  const step = Math.ceil(array.length / numBars); // pick every Nth element

  const bars = array
    .filter((_, i) => i % step === 0)
    .map((element, index) => {
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
