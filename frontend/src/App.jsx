import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import CrearContrato from './components/CrearContrato';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 bg-gray-50 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crear-contrato" element={<CrearContrato />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;