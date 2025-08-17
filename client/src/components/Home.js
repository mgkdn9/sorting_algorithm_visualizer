import Graph from "../components/Graph";
import React from "react";

// Bootstrap Components
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

const Home = (props) => {
  const container = {
    marginTop: "100px",
  };
  const title = {
    fontSize: "40px",
    textAlign: "center",
  };
  const subtitle = {
    fontSize: "20px",
    textAlign: "center",
    width: "100%",
    maxWidth: "650px",
    margin: "0 auto",
    padding: "0 10px 20px 10px",
  };
  const graph = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: props.graphHeight,
    overflowX: "auto",
    overflowY: "auto",
  };

  return (
    <>
      <div style={container}>
        <h1 style={title}>AlgoViews</h1>
        <p style={subtitle}>
          This App was built to help you study and learn more on sorting
          algorithms.
        </p>
        <Stack>
          <div className="inputContainer">
            <div className="slidecontainer">
              <label
                htmlFor="animationSpeed"
                style={{
                  display: "inline-block",
                  marginRight: "8px",
                  whiteSpace: "nowrap",
                }}
              >
                Animation Speed:
              </label>
              <input
                onChange={props.changeDelay}
                type="range"
                min="1"
                max="100"
                value={props.delay}
                className="slider"
                id="animationSpeed"
              />
            </div>
          </div>
          <div style={graph} className="flexContainer">
            <Graph
              array={props.array}
              arrColors={props.arrColors}
              graphHeight={props.graphHeight}
            />
          </div>
          <div className="flexContainer">
            <Button
              disabled={props.busy}
              className="stackbutton"
              variant="secondary"
              onClick={() =>
                props.bubbleSort(props.array, props.array.length, false)
              }
            >
              Bubble Sort
            </Button>
            <Button
              disabled={props.busy}
              className="stackbutton"
              variant="secondary"
              onClick={() => props.quickSort(props.array, false)}
            >
              Quick Sort
            </Button>
            <Button
              disabled={props.busy}
              className="stackbutton"
              variant="secondary"
              onClick={() => props.mergeSort(props.array, false)}
            >
              Merge Sort
            </Button>
            <Button
              disabled={props.busy}
              className="stackbutton"
              variant="secondary"
              onClick={() => props.heapSort(props.array, false)}
            >
              Heap Sort
            </Button>
          </div>
          <Button
            className="stackbutton"
            id="regen-btn"
            variant="primary"
            onClick={() => props.setArray(props.regenerate())}
          >
            Regenerate Array
          </Button>
        </Stack>
      </div>
    </>
  );
};

export default Home;
