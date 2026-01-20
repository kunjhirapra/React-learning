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
import {useQuizContext} from "./contexts/QuizContext";

function App() {
  const {status, answer} = useQuizContext();
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ShowError />}
        {status === "ready" && <StartScreen />}
        {status === "start" && (
          <>
            <ProgressBar />
            <StartQuiz />
            <Footer>
              <Timer />
              {answer !== null && <NextButton />}
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}
export default App;
