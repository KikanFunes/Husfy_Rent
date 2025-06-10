import { useEffect, useState } from 'react';

function Contratos() {
  const [contratos, setContratos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/contratos')
      .then(res => res.json())
      .then(data => {
        setContratos(data);
        setCargando(false);
      })
      .catch(err => {
        console.error('Error al obtener contratos:', err);
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Cargando contratos...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Listado de Contratos</h1>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Propiedad</th>
            <th className="p-2 border">Arrendatario</th>
            <th className="p-2 border">Valor</th>
            <th className="p-2 border">Reajuste</th>
          </tr>
        </thead>
        <tbody>
          {contratos.map((contrato) => (
            <tr key={contrato.id}>
              <td className="p-2 border">{contrato.id}</td>
              <td className="p-2 border">{contrato.propiedadId}</td>
              <td className="p-2 border">{contrato.arrendatarioId}</td>
              <td className="p-2 border">${contrato.valorActual}</td>
              <td className="p-2 border">
                {new Date(contrato.fechaReajuste).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Contratos;