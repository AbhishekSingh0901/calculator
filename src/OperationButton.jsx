import { ACTIONS } from "./Calc"

export default function OperationButton({ operation, dispatch}){
    return(
        <button className="flex justify-center items-center hover:bg-slate-500 text-gray-800 text-2xl font-medium" onClick={() => dispatch({ type : ACTIONS.CHOOSE_OPERATION, payload :{operation}})}>{operation}</button>
    )
}