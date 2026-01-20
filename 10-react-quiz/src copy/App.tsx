import {useEffect, useReducer} from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import ShowError from "./components/Error";
import StartScreen from "./components/StartScreen";
import StartQuiz from "./components/StartQuiz";
import NextButton from "./components/NextButton";
import ProgressBar from "./components/ProgressBar";
import {FinishScreen} from "./components/FinishScreen";
import Timer from "./components/Timer";
import Footer from "./components/Footer";
interface Question {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}
interface State {
  questions: Question[];
  status: string;
  currentQuestionIndex: number;
  answer: null | number;
  points: number;
  highscore: number;
  secondsRemaining: number | null;
}

const initialState: State = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  currentQuestionIndex: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};
type QuizAction =
  | {type: "dataReceived"; payload: Question[]}
  | {type: "dataFailed"}
  | {type: "startQuiz"}
  | {type: "newAnswer"; payload: number}
  | {type: "nextQuestion"}
  | {type: "finished"}
  | {type: "retake"}
  | {type: "tick"};

function reducer(state: State, action: QuizAction): State {
  switch (action.type) {
    case "dataReceived":
      return {...state, questions: action.payload ?? [], status: "ready"};
    case "dataFailed":
      return {...state, status: "error"};
    case "startQuiz":
      return {
        ...state,
        status: "start",
        secondsRemaining: state.questions.length * 30,
        // secondsRemaining: 10,
      };
    case "newAnswer":
      const question = state.questions[state.currentQuestionIndex];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        answer: null,
      };
    case "finished":
      const newHighscore =
        state.points > state.highscore ? state.points : state.highscore;
      return {
        ...state,
        status: "finished",
        answer: null,
        highscore: newHighscore,
      };
    case "retake":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining:
          state.secondsRemaining !== null ? state.secondsRemaining - 1 : null,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action Unknown!!");
  }
}

function App() {
  const [
    {
      questions,
      status,
      currentQuestionIndex,
      answer,
      points,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((sum, q) => sum + q.points, 0);

  useEffect(function () {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({type: "dataReceived", payload: data} as const);
        console.log(data);
      } catch (error) {
        dispatch({type: "dataFailed"});
      }
    }
    fetchData();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ShowError />}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            dispatch={(action) => dispatch(action)}
          />
        )}
        {status === "start" && (
          <>
            <ProgressBar
              currentIndex={currentQuestionIndex}
              maxIndex={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <StartQuiz
              question={questions[currentQuestionIndex]}
              dispatch={(action) => dispatch(action)}
              answer={answer}
            />
            <Footer>
              <Timer
                secondsRemaining={secondsRemaining}
                dispatch={(action) => dispatch(action)}
              />
              {answer !== null && (
                <NextButton
                  dispatch={(action) => dispatch(action)}
                  answer={answer}
                  currentIndex={currentQuestionIndex}
                  numQuestions={numQuestions}
                />
              )}
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highScore={highscore}
            dispatch={(action) => dispatch(action)}
            secondsRemaining={secondsRemaining}
          />
        )}
      </Main>
    </div>
  );
}
export default App;
