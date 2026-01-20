import type {Question} from "./StartQuiz";

export function Options({
  question,
  dispatch,
  answer,
}: {
  question: Question;
  dispatch: React.Dispatch<{type: "newAnswer"; payload: number}>;
  answer: null | number;
}) {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={option}
          onClick={() =>
            dispatch({
              type: "newAnswer",
              payload: index,
            })
          }
          disabled={answer !== null}
          className={`btn-option btn btn-ui ${
            index === answer ? "answer" : ""
          } ${
            answer !== null
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}>
          {option}
        </button>
      ))}
    </div>
  );
}
