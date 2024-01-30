import "./App.css";
import Display from "./Display/Display.jsx";
import Home from "./Home/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lobby from "./Lobby/Lobby.jsx";
function App() {
  return (
    <>
      <div style={{ height: "100vh", width: "100%" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Game" element={<Display />} />
            <Route path="/Lobby" element={<Lobby />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
