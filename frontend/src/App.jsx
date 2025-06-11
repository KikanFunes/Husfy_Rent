import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Contratos from './pages/Contratos';
import NuevoContrato from './pages/NuevoContrato'; // Importar el componente NuevoContrato

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <aside className="w-64 bg-gray-800 text-white p-6">
          <h2 className="text-2xl font-bold mb-6">Panel de Control</h2>
          <nav className="space-y-4">
            <NavLink to="/contratos" className={({ isActive }) => `block hover:text-blue-300 ${isActive ? 'bg-gray-900 font-semibold' : ''}`}>
              Contratos
            </NavLink>
            <NavLink to="/nuevo-contrato" className={({ isActive }) => `block hover:text-blue-300 ${isActive ? 'bg-gray-900 font-semibold' : ''}`}>
              Crear Contrato
            </NavLink>
          </nav>
        </aside>
        <div className="flex-1 bg-gray-50 p-6">
          <Routes>
            <Route path="/contratos" element={<Contratos />} />
            <Route path="/nuevo-contrato" element={<NuevoContrato />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;