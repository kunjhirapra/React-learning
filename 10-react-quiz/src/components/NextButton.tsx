import {useQuizContext} from "../contexts/QuizContext";

function NextButton() {
  const {currentQuestionIndex, numQuestions, answer, dispatch} =
    useQuizContext();
  const isLastQuestion = currentQuestionIndex === numQuestions - 1;

  return (
    <button
      className="btn btn-ui"
      disabled={answer === null}
      onClick={() =>
        dispatch({type: isLastQuestion ? "finished" : "nextQuestion"})
      }>
      {isLastQuestion ? "Finish" : "Next"}
    </button>
  );
}

export default NextButton;
