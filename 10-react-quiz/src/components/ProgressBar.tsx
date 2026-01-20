import {useQuizContext} from "../contexts/QuizContext";

function ProgressBar() {
  const {currentQuestionIndex, numQuestions, points, maxPoints, answer} =
    useQuizContext();

  return (
    <header className="progress">
      <progress
        value={currentQuestionIndex + Number(answer !== null)}
        max={numQuestions}></progress>
      <p>
        Question <strong>{currentQuestionIndex + 1}</strong>/ {numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/ {maxPoints} Points
      </p>
    </header>
  );
}

export default ProgressBar;
