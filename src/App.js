import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./Components/Home/Home";
import { CharacterProfile } from "./Components/Characters/CharacterProfile";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/:id" element={<CharacterProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
