import SceneManager from "./components/SceneManager";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import ResultsPage from "./components/ResultsPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/game" element={<SceneManager />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
