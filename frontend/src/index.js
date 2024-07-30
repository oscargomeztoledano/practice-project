import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router basename={process.env.PUBLIC_URL}>
      <Routes> 
        <Route path="/" element={<Home />} />
        {/* TODO poner el resto de rutas */}
      </Routes>
    </Router>
  </React.StrictMode>
);