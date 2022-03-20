import "./App.css";
import { Heroes } from "./Components/Heroes/Heroes";
import { LandingPage } from "./Components/LandingPage/LandingPage";
import ApiContext from "./Context/ApiContext";
import Marvel from "./Assets/Marvel.svg";

function App() {
  return (
    <div className="App">
      <ApiContext>
        <LandingPage />
        <img className="marvelLeft" src={Marvel} alt="Marvel logo" />
        <Heroes />
      </ApiContext>
    </div>
  );
}

export default App;
