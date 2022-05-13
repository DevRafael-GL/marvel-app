import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./Components/Home/Home";
import { Comics } from "./Components/Comics/Comics";
import { Characters } from "./Components/Characters/Characters";
import { Footer } from "./Components/Footer/Footer";
import { Events } from "./Components/Events/Events";
import { TopButton } from "./Components/Helper/TopButton";

function App() {
  return (
    <div className="App">
      <Router>
        <main className="AppBody">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/comics" element={<Comics />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </main>
        <TopButton />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
