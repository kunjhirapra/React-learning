import {useQuizContext} from "../contexts/QuizContext";

function StartScreen() {
  const {numQuestions, dispatch} = useQuizContext();

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>
        {numQuestions} Question{numQuestions !== 1 && "s"} to test your React
        mastery
      </h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({type: "startQuiz"})}>
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
