import {useReducer} from "react";
const initialState = {count: 0, step: 1};

function reducer(
  state: {count: number; step: number},
  action: {type: string; payload?: number}
) {
  switch (action.type) {
    case "dec":
      return {...state, count: state.count - state.step};
    case "inc":
      return {...state, count: state.count + state.step};
    case "setCount":
      return {...state, count: action.payload ?? state.count};
    case "setStep":
      return {...state, step: action.payload ?? state.step};
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown action");
  }
}

export default function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);

  const [state, dispatch] = useReducer(reducer, initialState);
  const {count, step} = state;
  const date = new Date();
  date.setDate(date.getDate() + count);
  function reset() {
    dispatch({type: "reset"});
  }

  return (
    <>
      <div className="counter">
        <div style={{display: "flex"}}>
          <input
            type="range"
            name="steps"
            id="steps"
            min={0}
            max={10}
            value={step}
            onChange={(e) =>
              dispatch({type: "setStep", payload: Number(e.target.value)})
            }
          />
          <span>Step: {step}</span>
        </div>

        <div>
          <button onClick={() => dispatch({type: "dec"})}>-</button>
          <input
            type="text"
            name="count"
            id="count"
            value={count}
            onChange={(e) =>
              dispatch({type: "setCount", payload: Number(e.target.value)})
            }
          />
          <button onClick={() => dispatch({type: "inc"})}>+</button>
        </div>
        <p>{date.toDateString()}</p>
        {count !== 0 || step !== 1 ? (
          <button type="reset" onClick={() => reset()}>
            Reset
          </button>
        ) : null}
      </div>
    </>
  );
}
