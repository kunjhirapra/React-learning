import {Options} from "./Options";
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}
function StartQuiz({
  question,
  dispatch,
  answer,
}: {
  question: Question;
  dispatch: React.Dispatch<{type: "newAnswer"; payload: number}>;
  answer: null | number;
}) {
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
