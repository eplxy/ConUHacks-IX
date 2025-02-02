import SceneManager from "./components/SceneManager";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import ResultsPage from "./components/ResultsPage";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#5A755A",
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/game" element={<SceneManager />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
