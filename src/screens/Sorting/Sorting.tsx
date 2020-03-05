import React, { useReducer, useMemo, Dispatch, useState } from "react";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import SortingAlgo from "../../algorithms/Sorting/Sorting";

const Sorting: React.FC = () => {
  const randomMatrix = (dimension: number = 20): number[] => {
    let array: number[] = [];
    for (let i: number = 0; i < dimension; i++) {
      array.push(Math.random());
    }
    return array;
  };

  const [tabs, setTabs] = useState(0);

  const heightReducer = (
    state: number[],
    action: { type: string; payload: number[] }
  ): number[] => {
    switch (action.type) {
      case "UPDATE":
        return [...action.payload];
      default:
        return state;
    }
  };

  const [height, setHeight]: [
    number[],
    Dispatch<{ type: string; payload: number[] }>
  ] = useReducer(heightReducer, randomMatrix(200));

  const start = (): void => {
    let sort: SortingAlgo = new SortingAlgo(setHeight, 50);
    switch (tabs) {
      case 0:
        sort.selectionSort([...height]);
        break;
      case 1:
        sort.bubbleSort([...height]);
        break;
      default:
        sort.selectionSort([...height]);
    }
  };

  const onClick = (index: number): void => {
    setTabs(index);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Button onClick={start}>Start</Button>
        <DropdownButton
          id="dimension-select-dropdown-button"
          title={["Selection Sort", "Bubble Sort"][tabs]}
        >
          <Dropdown.Item as="button" onClick={() => onClick(0)}>
            Selection Sort
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={() => onClick(1)}>
            Bubble Sort
          </Dropdown.Item>
        </DropdownButton>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row"
        }}
      >
        {height.map((value, index) => (
          <Tower key={index} height={value} />
        ))}
      </div>
    </>
  );
};

interface Props {
  key: number;
  height: number;
}
const Tower = (props: Props) => {
  return useMemo(
    () => (
      <div
        style={{
          background: "red",
          height: 500 * props.height,
          width: 20,
          border: 0.25,
          borderColor: "black",
          borderStyle: "solid"
        }}
      />
    ),
    [props.height]
  );
};

export default Sorting;