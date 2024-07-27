import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Routes>
                //TODO: ejemplo de rutas, ir rellenando con las rutas necesarias
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
}