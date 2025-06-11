// ... existing code ...
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-blue-400 font-semibold' // Clases para el enlace activo
      : 'hover:text-gray-300'; // Clases para enlaces inactivos

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-8">Panel de Control</h2>
      <nav className="flex flex-col gap-4">
        <NavLink to="/" end className={linkClass}>
          Contratos
        </NavLink>
        <NavLink to="/crear-contrato" className={linkClass}>
          Crear contrato
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
