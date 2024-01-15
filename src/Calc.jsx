import { useReducer } from "react";
import Button from "./Button";
import OperationButton from "./OperationButton";
import Delete from "./Delete";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === 0 && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand?.includes(".")) {
        return state;
      }
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      /**
       *
       * currentOperad = null, "12"
       */
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand === undefined && state.prevOperand === undefined)
        return state;
      if (state.prevOperand === undefined) {
        return {
          ...state,
          operation: payload.operation,
          prevOperand: state.currentOperand,
          currentOperand: undefined,
        };
      }
      if (state.currentOperand === undefined) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      return {
        ...state,
        prevOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: undefined,
      };

    case ACTIONS.EVALUATE:
      if (
        state.currentOperand === undefined ||
        state.prevOperand === undefined ||
        state.operation === undefined
      )
        return state;

      return {
        ...state,
        overwrite: true,
        currentOperand: evaluate(state),
        prevOperand: undefined,
        operation: undefined,
      };

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite === true) {
        return {
          ...state,
          overwrite: false,
          currentOperand: undefined,
        };
      }
      if (state.currentOperand == undefined) return state;
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: undefined,
        };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
  }
}

function evaluate({ currentOperand, prevOperand, operation }) {
  const prev = parseFloat(prevOperand); // "3" = 3.0 "3.2" = 3.2
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";

  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;

    case "-":
      computation = prev - current;
      break;

    case "*":
      computation = prev * current;
      break;

    case "/":
      computation = prev / current;
      break;
  }
  return computation.toString(); //3+2 = 5.toString() = "5"
}

// const intialState = {
//   currentOperand: null,
//   prevOperand: null,
//   operation: null,
//   overwrite: false
// };

export default function Calc() {
  /**
   *
   * useReducer takes 2 args
   * 1. reducer
   * 2. intialState
   *
   * Returns an array
   * 1. state
   * 2. dispatch(action => {type: type of action , payload: data})
   *
   * dispatch({type: ACTION.ADD_DIGIT //*"add digit" })
   *  */
  const [state, dispatch] = useReducer(reducer, {});
  const { currentOperand, prevOperand, operation } = state;

  return (
    <div className=" border-gray-400 shadow-2xl h-4/6 w-80 bg-cyan-100 grid grid-rows-7 grid-cols-4 gap-1 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">
      <div className=" p-5 text-white font-mono col-span-4 row-span-2 flex flex-col bg-gradient-to-tr from-gray-900 to-gray-600 ">
        <div className="text-2xl">
          {prevOperand} {operation}
        </div>
        <div className=" text-4xl">{currentOperand}</div>
      </div>
      <div
        className="col-span-2 row-span-1 flex justify-center items-center font-medium text-xl text-gray-800 hover:bg-slate-400"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </div>
      <Delete val="DEL" dispatch={dispatch} />
      <OperationButton operation="/" dispatch={dispatch} />
      <Button val={1} dispatch={dispatch} />
      <Button val={2} dispatch={dispatch} />
      <Button val={3} dispatch={dispatch} />
      <OperationButton operation={"*"} dispatch={dispatch} />
      <Button val={4} dispatch={dispatch} />
      <Button val={5} dispatch={dispatch} />
      <Button val={6} dispatch={dispatch} />
      <OperationButton operation={"+"} dispatch={dispatch} />
      <Button val={7} dispatch={dispatch} />
      <Button val={8} dispatch={dispatch} />
      <Button val={9} dispatch={dispatch} />
      <OperationButton operation={"-"} dispatch={dispatch} />
      <Button val="." dispatch={dispatch} />
      <Button val={0} dispatch={dispatch} />
      <div
        className=" col-span-2 flex justify-center items-center text-2xl text-gray-900 hover:bg-slate-400"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </div>
    </div>
  );
}
