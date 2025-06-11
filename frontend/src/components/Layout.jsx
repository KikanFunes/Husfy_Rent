import { Outlet, Link } from 'react-router-dom';

function Layout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Panel de Control</h2>
        <nav className="space-y-4">
          <Link to="/" className="block hover:text-blue-300">Home</Link>
          <Link to="/contratos" className="block hover:text-blue-300">Contratos</Link>
          <Link to="/nuevo-contrato" className="block hover:text-blue-300">Crear Contrato</Link>
          {/* Aquí puedes agregar más links como Propiedades, Arrendatarios, etc. */}
        </nav>
      </aside>

      {/* Contenido dinámico */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet /> {/* Aquí se renderiza la vista según la ruta */}
      </main>
    </div>
  );
}

export default Layout;