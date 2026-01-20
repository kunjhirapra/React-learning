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
  return (
    <>
      <div className="d-flex align-items-center justify-content-center gap-2 ">
        <button
          className="btn btn-secondary"
          onClick={() => setStep(Math.max(1, step - 1))}>
          -
        </button>
        <h1>Step: {step}</h1>
        <button className="btn btn-secondary" onClick={() => setStep(step + 1)}>
          +
        </button>
      </div>
      <div className="d-flex align-items-center justify-content-center gap-2 ">
        <button
          className="btn btn-secondary"
          onClick={() => setCount(count - step)}>
          -
        </button>
        <h1>Count: {count}</h1>
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
    </>
  );
}
export default App;
