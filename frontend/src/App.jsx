import { useState, useEffect } from 'react';

function App() {
  const [propiedades, setPropiedades] = useState([]);
  const [arrendatarios, setArrendatarios] = useState([]);
  const [contratos, setContratos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [contratoSeleccionado, setContratoSeleccionado] = useState(null);
  const [mensajeCorreo, setMensajeCorreo] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/propiedades')
      .then(res => res.json())
      .then(data => setPropiedades(data))
      .catch(err => console.error('Error al cargar propiedades:', err));

    fetch('http://localhost:3000/arrendatarios')
      .then(res => res.json())
      .then(data => setArrendatarios(data))
      .catch(err => console.error('Error al cargar arrendatarios:', err));

    fetch('http://localhost:3000/contratos')
      .then(res => res.json())
      .then(data => setContratos(data))
      .catch(err => console.error('Error al cargar contratos:', err));
  }, []);

  const [form, setForm] = useState({
    propiedadId: '',
    arrendatarioId: '',
    valorBase: '',
    glosaCobroMes: '',
    fechaInicio: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/contratos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          propiedadId: parseInt(form.propiedadId),
          arrendatarioId: parseInt(form.arrendatarioId),
          valorBase: parseInt(form.valorBase),
          valorActual: parseInt(form.valorBase),
          glosaCobroMes: form.glosaCobroMes || null,
          fechaInicio: form.fechaInicio
        })
      });

      if (!response.ok) throw new Error('Error al guardar contrato');

      const data = await response.json();
      alert('Contrato creado con éxito ✅');
      console.log(data);

      setForm({ propiedadId: '', arrendatarioId: '', valorBase: '', glosaCobroMes: '', fechaInicio: '' });

      const contratosActualizados = await fetch('http://localhost:3000/contratos');
      const nuevosContratos = await contratosActualizados.json();
      setContratos(nuevosContratos);
    } catch (error) {
      console.error('Error en la creación del contrato:', error);
      alert('Ocurrió un error al crear el contrato ❌');
    }
  };
  
  const propiedadSeleccionada = propiedades.find(p => p.id === parseInt(form.propiedadId));

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Crear nuevo contrato</h2>

        <label className="block mb-2">Propiedad</label>
        <select name="propiedadId" value={form.propiedadId} onChange={handleChange} className="w-full mb-4 p-2 border rounded">
          <option value="">Selecciona una propiedad</option>
          {propiedades.map((p) => (
            <option key={p.id} value={p.id}>{p.direccion}</option>
          ))}
        </select>

        {propiedadSeleccionada && (
          <div className="mb-4 text-sm text-gray-700">
            <p>Propietario: <strong>{propiedadSeleccionada.propietario.nombre}</strong></p>
            <p>Correo: {propiedadSeleccionada.propietario.correo}</p>
            <p>Comisión: {propiedadSeleccionada.comision}%</p>
            <p>Descuento: ${propiedadSeleccionada.descuento}</p>
          </div>
        )}

        <label className="block mb-2">Arrendatario</label>
        <select name="arrendatarioId" value={form.arrendatarioId} onChange={handleChange} className="w-full mb-4 p-2 border rounded">
          <option value="">Selecciona un arrendatario</option>
          {arrendatarios.map((a) => (
            <option key={a.id} value={a.id}>{a.nombre}</option>
          ))}
        </select>

        <input
          type="number"
          name="valorBase"
          placeholder="Valor del arriendo"
          className="w-full mb-4 p-2 border rounded"
          value={form.valorBase}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="glosaCobroMes"
          placeholder="Glosa (opcional)"
          className="w-full mb-4 p-2 border rounded"
          value={form.glosaCobroMes}
          onChange={handleChange}
        />

        <input
          type="date"
          name="fechaInicio"
          className="w-full mb-6 p-2 border rounded"
          value={form.fechaInicio}
          onChange={handleChange}
          required
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Crear contrato
        </button>
      </form>

            {contratos.length > 0 && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-6xl">
          <h3 className="text-xl font-bold mb-4">Contratos creados</h3>
          <table className="w-full table-auto border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Propiedad</th>
                <th className="border px-4 py-2">Propietario</th>
                <th className="border px-4 py-2">Arrendatario</th>
                <th className="border px-4 py-2">Valor</th>
                <th className="border px-4 py-2">Inicio</th>
                <th className="border px-4 py-2">Reajuste</th>
                <th className="border px-4 py-2">
                  {new Date().toLocaleString('es-CL', { month: 'long' }).toUpperCase()}
                </th>
              </tr>
            </thead>
            <tbody>
              {contratos.map((c) => {
                const nombreMes = new Date().toLocaleString('es-CL', { month: 'long' });
                const mesEnCurso = nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1);
                const mesReajuste = new Date(c.fechaReajuste).toLocaleString('es-CL', { month: 'long' });
                const descuento = c.propiedad?.descuento ?? 0;
                const totalPagar = c.valorActual - descuento;

                const mensaje = `Estimado/a ${c.arrendatario?.nombre},

Esperando que te encuentres muy bien, paso a recordarte el valor de arriendo para el mes de ${mesEnCurso} de la propiedad ubicada en ${c.propiedad?.direccion}. El detalle es el siguiente:

- Valor de arriendo: $${c.valorActual?.toLocaleString()}
- Próximo reajuste: ${mesReajuste}
- Cargo / Descuento: $${descuento.toLocaleString()}
                - Total a pagar: $${totalPagar.toLocaleString()}`;

                return (
                  <tr key={c.id}>
                    <td className="border px-4 py-2">{c.propiedad?.direccion}</td>
                    <td className="border px-4 py-2">{c.propiedad?.propietario?.nombre}</td>
                    <td className="border px-4 py-2">{c.arrendatario?.nombre}</td>
                    <td className="border px-4 py-2">${c.valorActual?.toLocaleString()}</td>
                    <td className="border px-4 py-2">{new Date(c.fechaInicio).toLocaleDateString()}</td>
                    <td className="border px-4 py-2">{new Date(c.fechaReajuste).toLocaleDateString()}</td>
                    <td className="border px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        onChange={() => {
                          setContratoSeleccionado(c);
                          setMensajeCorreo(mensaje);
                          setModalVisible(true);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* 👇 Nuevo Modal */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Confirmar envío de correo</h2>

            <textarea
              className="w-full p-2 border rounded mb-4"
              rows="6"
              value={mensajeCorreo}
              onChange={(e) => setMensajeCorreo(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalVisible(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>

              <button
                onClick={() => {
                  alert(`Correo enviado:\n\n${mensajeCorreo}`);
                  setModalVisible(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Enviar correo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;