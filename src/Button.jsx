import { ACTIONS } from "./Calc";

// eslint-disable-next-line react/prop-types
export default function Button({ val, dispatch }) {
  return (
    <button
      className="flex justify-center items-center text-2xl font-light hover:bg-slate-400"
      onClick={() =>
        dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: val } })
      }
    >
      {val}
    </button>
  );
}
