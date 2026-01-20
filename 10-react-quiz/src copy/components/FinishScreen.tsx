export function FinishScreen({
  points,
  maxPoints,
  highScore,
  dispatch,
  secondsRemaining,
}: {
  points: number;
  maxPoints: number;
  highScore: number;
  dispatch: React.Dispatch<{type: "retake"}>;
  secondsRemaining: number | null;
}) {
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
          {points > highScore
            ? `🎉 New HighScore: ${points} Points`
            : `HighScore: ${highScore} Points`}
        </span>
      </p>
      <div className="">
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
