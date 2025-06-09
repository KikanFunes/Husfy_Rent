const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(express.json()); // 👈 habilita peticiones desde el frontend
app.use(cors());

// Ruta base para comprobar que el servidor funciona
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// ✅ Obtener todas las propiedades con su propietario incluido
app.get('/propiedades', async (req, res) => {
  try {
    const propiedades = await prisma.propiedad.findMany({
      include: {
        propietario: true,
      },
    });
    res.json(propiedades);
  } catch (error) {
    console.error('Error al obtener propiedades:', error);
    res.status(500).json({ error: 'Error al obtener propiedades' });
  }
});

// ✅ Obtener todos los arrendatarios
app.get('/arrendatarios', async (req, res) => {
  try {
    const arrendatarios = await prisma.arrendatario.findMany();
    res.json(arrendatarios);
  } catch (error) {
    console.error('Error al obtener arrendatarios:', error);
    res.status(500).json({ error: 'Error al obtener arrendatarios' });
  }
});

// ✅ Crear un nuevo contrato
app.post('/contratos', async (req, res) => {
  const { arrendatarioId, propiedadId, fechaInicio, valorBase, valorActual, glosaCobro } = req.body;

  const fechaReajuste = new Date(fechaInicio);
  fechaReajuste.setMonth(fechaReajuste.getMonth() + 6);

  try {
    const nuevoContrato = await prisma.contrato.create({
      data: {
        fechaInicio: new Date(fechaInicio),
        fechaReajuste,
        valorBase,
        valorActual, // 👈 Este campo es obligatorio en tu modelo Prisma
        glosaCobroMes,
        arrendatario: {
          connect: { id: arrendatarioId }
        },
        propiedad: {
          connect: { id: propiedadId }
        }
      }
    });

    res.status(201).json(nuevoContrato);
  } catch (error) {
    console.error('Error al crear contrato:', error);
    res.status(500).json({ error: 'No se pudo crear el contrato' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
