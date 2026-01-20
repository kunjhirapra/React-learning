function NextButton({
  dispatch,
  answer,
  currentIndex,
  numQuestions,
}: {
  dispatch: React.Dispatch<{type: "nextQuestion"} | {type: "finished"}>;
  answer: null | number;
  currentIndex: number;
  numQuestions: number;
}) {
  console.log(answer);

  const isLastQuestion = currentIndex === numQuestions - 1;

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
