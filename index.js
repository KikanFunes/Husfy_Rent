const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

app.post('/contratos', async (req, res) => {
  const { arrendatario, correo, valorBase, fechaInicio } = req.body;

  // Calculamos fecha de reajuste a 6 meses desde el inicio
  const fechaReajuste = new Date(fechaInicio);
  fechaReajuste.setMonth(fechaReajuste.getMonth() + 6);

  try {
    const nuevoContrato = await prisma.contratoArriendo.create({
      data: {
        arrendatario,
        correo,
        valorBase,
        fechaInicio: new Date(fechaInicio),
        fechaReajuste
      }
    });

    res.status(201).json(nuevoContrato);
  } catch (error) {
    console.error("Error al guardar contrato:", error);
    res.status(500).json({ error: 'Error al crear contrato' });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
