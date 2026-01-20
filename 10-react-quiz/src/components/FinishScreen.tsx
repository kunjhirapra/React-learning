import {useQuizContext} from "../contexts/QuizContext";

export function FinishScreen() {
  const {
    secondsRemaining,
    points,
    maxPoints,
    highscore,
    isNewHighscore,
    dispatch,
  } = useQuizContext();
  const mins = Math.floor((secondsRemaining ?? 0) / 60);
  const seconds = (secondsRemaining ?? 0) % 60;
  const percentage = Math.ceil((points / maxPoints) * 100);
  let emoji;
  if (percentage === 100) {
    emoji = "🏆";
  } else if (percentage >= 80) {
    emoji = "🎉";
  } else if (percentage >= 50) {
    emoji = "😊";
  } else {
    emoji = "😞";
  }
  return (
    <div className="finish-screen">
      <p className="result">
        <span>{emoji}</span>
        You scored {points} out of {maxPoints} points ({percentage}%)
      </p>
      <p className="item-center">
        <span className="highscore">
          {isNewHighscore
            ? `🎉 New HighScore: ${points} Points`
            : `HighScore: ${highscore} Points`}
        </span>
      </p>
      <div className="timer">
        Time Taken : {mins < 10 && "0"}
        {mins}:{seconds < 10 && "0"}
        {seconds}
      </div>

      <button className="btn btn-ui" onClick={() => dispatch({type: "retake"})}>
        Retake Quiz
      </button>
    </div>
  );
}
