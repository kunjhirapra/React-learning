import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";

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
  isNewHighscore: boolean;
}

type QuizAction =
  | {type: "dataReceived"; payload: Question[]}
  | {type: "dataFailed"}
  | {type: "startQuiz"}
  | {type: "newAnswer"; payload: number}
  | {type: "nextQuestion"}
  | {type: "finished"}
  | {type: "retake"}
  | {type: "tick"};

const initialState: State = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  currentQuestionIndex: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  isNewHighscore: false,
};
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
      return {
        ...state,
        status: "finished",
        answer: null,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
        isNewHighscore: state.points > state.highscore,
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
export interface QuizContextType extends State {
  numQuestions: number;
  maxPoints: number;
  dispatch: React.Dispatch<QuizAction>;
}
const QuizContext = createContext<QuizContextType | null>(null);
function QuizContextProvider({children}: {children: ReactNode}) {
  const [
    {
      questions,
      status,
      currentQuestionIndex,
      answer,
      points,
      highscore,
      secondsRemaining,
      isNewHighscore,
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
    <QuizContext.Provider
      value={{
        questions,
        numQuestions,
        maxPoints,
        status,
        currentQuestionIndex,
        answer,
        points,
        highscore,
        secondsRemaining,
        dispatch,
        isNewHighscore,
      }}>
      {children}
    </QuizContext.Provider>
  );
}

function useQuizContext() {
  const value = useContext(QuizContext);
  if (!value)
    throw new Error(
      "Used QuizContext outside of Provider. The context can only be used in children of the Provider"
    );
  return value;
}

export {useQuizContext, QuizContextProvider};
