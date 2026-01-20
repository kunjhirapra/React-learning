function StartScreen({
  numQuestions,
  dispatch,
}: {
  numQuestions: number;
  dispatch: React.Dispatch<{type: "startQuiz"}>;
}) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} Question to test your React Mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({type: "startQuiz"})}>
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
