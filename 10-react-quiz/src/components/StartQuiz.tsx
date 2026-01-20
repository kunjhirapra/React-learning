import {useQuizContext} from "../contexts/QuizContext";
import {Options} from "./Options";
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}
function StartQuiz() {
  const {questions, currentQuestionIndex, dispatch, answer} = useQuizContext();
  const question = questions[currentQuestionIndex];
  return (
    <div className="question-block">
      <h3>{question.question}</h3>
      <div className="options">
        <Options question={question} dispatch={dispatch} answer={answer} />
      </div>
    </div>
  );
}
export default StartQuiz;
