function ProgressBar({
  currentIndex,
  maxIndex,
  points,
  maxPoints,
  answer,
}: {
  currentIndex: number;
  maxIndex: number;
  points: number;
  maxPoints: number;
  answer: null | number;
}) {
  return (
    <header className="progress">
      <progress
        value={currentIndex + Number(answer !== null)}
        max={maxIndex}></progress>
      <p>
        Question <strong>{currentIndex + 1}</strong>/ {maxIndex}
      </p>
      <p>
        <strong>{points}</strong>/ {maxPoints} Points
      </p>
    </header>
  );
}

export default ProgressBar;
