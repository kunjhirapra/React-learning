import {useState} from "react";
import "../../bootstrap.min.css";
import "./index.css";

export default function App() {
  return (
    <div className="App">
      <FlashCards />
    </div>
  );
}
interface questionTypes {
  id: number;
  question: string;
  answer: string;
}
const questions: questionTypes[] = [
  {
    id: 1,
    question: "What language is React based on?",
    answer: "JavaScript",
  },
  {
    id: 2,
    question: "What are the building blocks of React apps?",
    answer: "Components",
  },
  {
    id: 3,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX",
  },
  {
    id: 4,
    question: "How to pass data from parent to child components?",
    answer: "Props",
  },
  {
    id: 5,
    question: "How to give components memory?",
    answer: "useState hook",
  },
  {
    id: 6,
    question:
      "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element",
  },
];

function FlashCards() {
  const [openedCard, setOpenedCard] = useState<number | null>(null);
  function toggleActive(id: number) {
    setOpenedCard(id !== openedCard ? id : null);
  }
  return (
    <div className="container">
      <h1>Flash Cards</h1>
      <div className="cards row">
        {questions.map(({id, question, answer}) => (
          <div key={id} className="col-12 col-md-4 col-lg-4 p-4">
            <div
              className={`card-content ${id === openedCard ? "active" : ""}`}
              onClick={() => toggleActive(id)}>
              <p>{id === openedCard ? answer : question}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
