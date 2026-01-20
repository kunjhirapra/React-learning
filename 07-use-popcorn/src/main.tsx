import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
// import StarRating from "./components/StarRating";
// import "../../bootstrap.min.css";

// function Test() {
//   const [movieRating, SetMovieRating] = useState(0); //import useState to run this Component
//   return (
//     <div>
//       <StarRating color="blue" onSetRating={SetMovieRating} />
//       <p>This Movie was rated {movieRating}.</p>
//     </div>
//   );
// }
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    {/* <StarRating />
    <StarRating
      className="fw-semibold"
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      defaultRating={3}
    />
    <Test /> */}
  </StrictMode>
);
