import React, { useReducer, useMemo, Dispatch, useState } from "react";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import SortingAlgo from "algorithms/Sorting/SortingAlgo";

const Sorting: React.FC = () => {
  const length: number = 200;
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
  ] = useReducer(heightReducer, randomMatrix(length));

  const start = (): void => {
    let sort: SortingAlgo = new SortingAlgo(setHeight, 50);
    switch (tabs) {
      case 0:
        sort.selectionSort([...height]);
        break;
      case 1:
        sort.bubbleSort([...height]);
        break;
      case 2:
        sort.heapSort([...height]);
        break;
      case 3:
        let arrayM: number[] = [...height];
        sort.mergeSort(arrayM);
        break;
      case 4:
        let arrayQ: number[] = [...height];
        sort.quickSort(arrayQ, 0, arrayQ.length - 1);
        break;
      case 5:
        sort.insertionSort([...height]);
        break;
      default:
        sort.selectionSort([...height]);
    }
  };

  const onClick = (tab: number): void => {
    if (tabs !== tab) {
      setTabs(tab);
      setHeight({ type: "UPDATE", payload: randomMatrix(length)});
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Button onClick={start}>Start</Button>
        <DropdownButton
          id="dimension-select-dropdown-button"
          title={["Selection Sort", "Bubble Sort", "Heap Sort", "Merge Sort", "Quick Sort", "Insertion Sort"][tabs]}
        >
          <Dropdown.Item as="button" onClick={() => onClick(0)}>
            Selection Sort
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={() => onClick(1)}>
            Bubble Sort
          </Dropdown.Item>

          <Dropdown.Item as="button" onClick={() => onClick(2)}>
            Heap Sort
          </Dropdown.Item>

          <Dropdown.Item as="button" onClick={() => onClick(3)}>
            Merge Sort
          </Dropdown.Item>

          <Dropdown.Item as="button" onClick={() => onClick(4)}>
            Quick Sort
          </Dropdown.Item>

          <Dropdown.Item as="button" onClick={() => onClick(5)}>
            Insertion Sort
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
          background: "#71d7f4",
          height: 750 * props.height,
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
