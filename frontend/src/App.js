import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Home"; 
import HomeTeams from "./components/teams/home";
import 'bootstrap/dist/css/bootstrap.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<HomeTeams/>} />
      </Routes>
    </Router>
  );
}

