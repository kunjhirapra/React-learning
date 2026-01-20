import {useState} from "react";
import "./App.css";
import "./bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}
function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const date = new Date();
  date.setDate(date.getDate() + count);
  function reset() {
    setCount(0);
    setStep(1);
  }
  return (
    <>
      <div className="d-flex align-items-center justify-content-center gap-2 ">
        <input
          type="range"
          name="steps"
          id="steps"
          min={0}
          max={10}
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
        <span>Step: {step}</span>
      </div>
      <div className="d-flex align-items-center justify-content-center gap-2 ">
        <button
          className="btn btn-secondary"
          onClick={() => setCount(count - step)}>
          -
        </button>
        <input
          type="text"
          name="count"
          id="count"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />

        <button
          className="btn btn-secondary"
          onClick={() => setCount(count + step)}>
          +
        </button>
      </div>
      <p>
        <span>
          {count === 0
            ? "Today is"
            : count > 0
            ? `${count} day(s) from today is`
            : `${Math.abs(count)}days ago was`}{" "}
        </span>
        <span>{date.toDateString()}</span>
      </p>
      {count !== 0 || step !== 1 ? (
        <button
          className="btn btn-secondary"
          type="reset"
          onClick={() => reset()}>
          Reset
        </button>
      ) : null}
    </>
  );
}
export default App;
