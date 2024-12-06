
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";  // Import della homepage
import Details from "./components/Details";    // Import dei dettagli del meteo

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />  {/* Homepage */}
        <Route path="/details/:city" element={<Details/>} />  {/* Dettagli meteo */}
      </Routes>
    </Router>
  );
}

export default App;
