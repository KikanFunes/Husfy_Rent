import React, { useState } from 'react';

function FormularioContrato() {
  const [arrendatarioId, setArrendatarioId] = useState('');
  const [propiedadId, setPropiedadId] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [valorBase, setValorBase] = useState('');
  const [valorActual, setValorActual] = useState('');
  const [glosaCobroMes, setGlosaCobroMes] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/contratos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          arrendatarioId,
          propiedadId,
          fechaInicio,
          valorBase,
          valorActual,
          glosaCobroMes,
        }),
      });

      if (response.ok) {
        // El contrato se guardó correctamente
        console.log('Contrato guardado correctamente');
        // Limpiar el formulario
        setArrendatarioId('');
        setPropiedadId('');
        setFechaInicio('');
        setValorBase('');
        setValorActual('');
        setGlosaCobroMes('');
      } else {
        // Hubo un error al guardar el contrato
        console.error('Error al guardar el contrato:', response.status);
      }
    } catch (error) {
      console.error('Error al enviar la petición:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="arrendatarioId">ID del Arrendatario:</label>
        <input
          type="text"
          id="arrendatarioId"
          name="arrendatarioId"
          value={arrendatarioId}
          onChange={(e) => setArrendatarioId(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="propiedadId">ID de la Propiedad:</label>
        <input
          type="text"
          id="propiedadId"
          name="propiedadId"
          value={propiedadId}
          onChange={(e) => setPropiedadId(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="fechaInicio">Fecha de Inicio:</label>
        <input
          type="date"
          id="fechaInicio"
          name="fechaInicio"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="valorBase">Valor Base:</label>
        <input
          type="number"
          id="valorBase"
          name="valorBase"
          value={valorBase}
          onChange={(e) => setValorBase(e.target.value)}
        />
      </div>
       <div>
        <label htmlFor="valorActual">Valor Actual:</label>
        <input
          type="number"
          id="valorActual"
          name="valorActual"
          value={valorActual}
          onChange={(e) => setValorActual(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="glosaCobroMes">Glosa Cobro Mes:</label>
        <input
          type="text"
          id="glosaCobroMes"
          name="glosaCobroMes"
          value={glosaCobroMes}
          onChange={(e) => setGlosaCobroMes(e.target.value)}
        />
      </div>
      <button type="submit">Crear Contrato</button>
    </form>
  );
}

export default FormularioContrato;
