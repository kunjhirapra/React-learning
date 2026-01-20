import {useEffect} from "react";
import {useQuizContext} from "../contexts/QuizContext";

function Timer() {
  const {secondsRemaining, dispatch} = useQuizContext();
  const mins = Math.floor((secondsRemaining ?? 0) / 60);
  const seconds = (secondsRemaining ?? 0) % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({type: "tick"});
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}
export default Timer;
