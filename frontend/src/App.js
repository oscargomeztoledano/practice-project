import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Home"; 
import HomeTeams from "./components/teams/home";
import TeamById from "./components/teams/teamByid";  // Importa tu componente TeamById
import HomePlayers from "./components/players/home";
import PlayerByID from "./components/players/playerByid";
import HomeGroups from "./components/groups/home";
import HomeMatches from "./components/matches/home";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<HomeTeams/>} />
        <Route path="/teams/:id" element={<TeamById />} />
        <Route path="/players" element={<HomePlayers/>} />
        <Route path="/players/:id" element={<PlayerByID />} />
        <Route path="/groups" element={<HomeGroups/>} />
        <Route path="/matches" element={<HomeMatches/>} />
      </Routes>
    </Router>
  );
}

