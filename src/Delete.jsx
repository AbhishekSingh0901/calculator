import { ACTIONS } from "./Calc"

export default function Delete({val, dispatch}){
    return(
        <button className="flex justify-center items-center hover:bg-gray-400 text-xl font-medium text-gray-800" onClick={() => dispatch({ type : ACTIONS.DELETE_DIGIT, payload :{digit:val}})}>{val}</button>
    )
}