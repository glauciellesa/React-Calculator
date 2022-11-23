/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "./Button";
import "./Calculator.css";
import KeyBoard from "./KeyBoard";
import Screen from "./Screen";

const initialState = {
  insertNumber: "",
  operation: null,
  accumulator: [],
  screenValue: 0,
};

function dispatch(target, state, setState) {
  let dataType = target.type;
  console.log({ target, state, setState });

  switch (dataType) {
    case "reset":
      setState(initialState);
      return;
    case "plusOrMinus":
      setPlusOrMinus(state, setState);
      return;
    case "percentage":
      convertToPercent(state, setState);
      return;
    case "number":
      setDigit(state, setState, target);
      return;
    case "operation":
      setOperation(state, setState, target.value);
      return;
    case "calculate":
      calculate(state, setState);
      return;
  }
}

const setPlusOrMinus = (state, setState) => {
  state.insertNumber = String(-1 * state.insertNumber);
  state.accumulator.pop();
  state.accumulator.push(state.insertNumber);
  state.screenValue = state.insertNumber;
  setState({
    ...state,
  });
};

const convertToPercent = (state, setState) => {
  state.insertNumber = state.insertNumber / 100;
  state.screenValue = state.insertNumber;
  setState({
    ...state,
  });
};

const setDigit = (state, setState, target) => {
  const insertNumber =
    state.insertNumber + target.value; /* Fazer a concatenação do número */
  setState({
    ...state,
    insertNumber,
    screenValue: insertNumber,
  });
};

const isDigit = (value) => {
  return /\d+/.test(value);
};

const isMathOperation = (value) => {
  return /^[+\-*%]$/.test(value);
};

function setOperation(state, setState, operation) {
  const lastAccumulatorElement =
    state.accumulator[state.accumulator.length - 1];
  if (state.insertNumber) {
    if (isDigit(lastAccumulatorElement)) {
      state.accumulator.pop();
    }
    state.accumulator.push(state.insertNumber);
  }
  if (isMathOperation(lastAccumulatorElement)) {
    state.accumulator.pop();
  }
  state.accumulator.push(operation);
  state.operation = null;
  state.insertNumber = "";

  setState({
    ...state,
  });
}

function calculate(state, setState) {
  state.accumulator.push(state.insertNumber ? state.insertNumber : "0");
  state.result = eval(state.accumulator.join("")).toString();
  state.screenValue = state.result;
  state.operation = null;
  state.insertNumber = "";
  state.accumulator = [];
  state.accumulator.push(state.result);
  setState({
    ...state,
  });
}

const Calculator = () => {
  const [state, setState] = useState(initialState);

  return (
    <div className="wrapper">
      <Screen>{state.screenValue}</Screen>
      <KeyBoard>
        <Button
          className="button"
          click={() => dispatch({ type: "reset" }, state, setState)}
        >
          AC
        </Button>
        <Button
          value=""
          className="button"
          click={() => dispatch({ type: "plusOrMinus" }, state, setState)}
        >
          +/-
        </Button>
        <Button
          value="%"
          className="button"
          click={() => dispatch({ type: "percentage" }, state, setState)}
        >
          %
        </Button>
        <Button
          className="button operators"
          click={() =>
            dispatch({ type: "operation", value: "/" }, state, setState)
          }
        >
          ÷
        </Button>
        <Button
          className="button"
          click={() => dispatch({ type: "number", value: 7 }, state, setState)}
        >
          7
        </Button>
        <Button
          className="button"
          click={() => dispatch({ type: "number", value: 8 }, state, setState)}
        >
          8
        </Button>
        <Button
          className="button"
          click={() => dispatch({ type: "number", value: 9 }, state, setState)}
        >
          9
        </Button>
        <Button
          className="button operators"
          click={() =>
            dispatch({ type: "operation", value: "*" }, state, setState)
          }
        >
          x
        </Button>
        <Button
          className="button"
          click={() => dispatch({ type: "number", value: 4 }, state, setState)}
        >
          4
        </Button>
        <Button
          className="button"
          click={() => dispatch({ type: "number", value: 5 }, state, setState)}
        >
          5
        </Button>
        <Button
          className="button"
          click={() => dispatch({ type: "number", value: 6 }, state, setState)}
        >
          6
        </Button>
        <Button
          className="button operators"
          click={() =>
            dispatch({ type: "operation", value: "-" }, state, setState)
          }
        >
          -
        </Button>
        <Button
          className="button"
          click={() => dispatch({ type: "number", value: 1 }, state, setState)}
        >
          1
        </Button>
        <Button
          className="button"
          click={() => dispatch({ type: "number", value: 2 }, state, setState)}
        >
          2
        </Button>
        <Button
          className="button"
          click={() => dispatch({ type: "number", value: 3 }, state, setState)}
        >
          3
        </Button>
        <Button
          className="button operators"
          click={() =>
            dispatch({ type: "operation", value: "+" }, state, setState)
          }
        >
          +
        </Button>
        <Button
          className="button twoColumns"
          click={() => dispatch({ type: "number", value: 0 }, state, setState)}
        >
          0
        </Button>
        <Button type="dot" value="." className="button">
          .
        </Button>
        <Button
          className="button operators"
          click={() =>
            dispatch({ type: "calculate", value: "=" }, state, setState)
          }
        >
          =
        </Button>
      </KeyBoard>
    </div>
  );
};

export default Calculator;
