import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./Components/Home/Home";
import { CharacterProfile } from "./Components/Characters/CharacterProfile";
import { Comics } from "./Components/Comics/Comics";
import { Characters } from "./Components/Characters/Characters";
import { Footer } from "./Components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <main className="AppBody">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/comics" element={<Comics />} />
            <Route path="/characters" element={<Characters />} />
            {/* <Route path="/character/:id" element={<CharacterProfile />} /> */}
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
