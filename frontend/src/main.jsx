import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Layout from './components/Layout';
import Contratos from './pages/Contratos';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Contratos />} />
          {/* En el futuro puedes agregar más rutas aquí */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
