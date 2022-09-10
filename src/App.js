import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer } from "./Components/Footer/Footer";
import { TopButton } from "./Components/Helper/TopButton";
import { Home } from "./pages/Home";
import { Comics } from "./pages/Comics";
import { Events } from "./pages/Events";
import { Characters } from "./pages/Characters";

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
