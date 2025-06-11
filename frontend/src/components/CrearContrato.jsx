// frontend/src/components/FormularioContrato.jsx
import React, { useState, useEffect } from 'react';

function FormularioContrato() {
  const [propiedades, setPropiedades] = useState([]);
  const [arrendatarios, setArrendatarios] = useState([]);
  const [form, setForm] = useState({
    propiedadId: '',
    arrendatarioId: '',
    valorBase: '',
    glosaCobroMes: '',
    fechaInicio: ''
  });

  useEffect(() => {
    fetch('http://localhost:3000/propiedades')
      .then(res => res.json())
      .then(data => setPropiedades(data))
      .catch(err => console.error('Error al cargar propiedades:', err));

    fetch('http://localhost:3000/arrendatarios')
      .then(res => res.json())
      .then(data => setArrendatarios(data))
      .catch(err => console.error('Error al cargar arrendatarios:', err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/contratos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

      alert('Contrato creado con éxito ✅');
      setForm({ propiedadId: '', arrendatarioId: '', valorBase: '', glosaCobroMes: '', fechaInicio: '' });
    } catch (error) {
      console.error('Error en la creación del contrato:', error);
      alert('Ocurrió un error al crear el contrato ❌');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Crear nuevo contrato</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Propiedad</label>
        <select name="propiedadId" value={form.propiedadId} onChange={handleChange} className="w-full mb-4 p-2 border rounded">
          <option value="">Selecciona una propiedad</option>
          {propiedades.map((p) => (
            <option key={p.id} value={p.id}>{p.direccion}</option>
          ))}
        </select>

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
    </div>
  );
}

export default FormularioContrato;