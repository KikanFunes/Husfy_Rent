/*
  Warnings:

  - You are about to drop the `ContratoArriendo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ContratoArriendo";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Propietario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Propiedad" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "direccion" TEXT NOT NULL,
    "comision" REAL NOT NULL,
    "descuento" REAL,
    "cargos" JSONB,
    "glosaCargos" TEXT,
    "propietarioId" INTEGER NOT NULL,
    CONSTRAINT "Propiedad_propietarioId_fkey" FOREIGN KEY ("propietarioId") REFERENCES "Propietario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Arrendatario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Contrato" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "propiedadId" INTEGER NOT NULL,
    "arrendatarioId" INTEGER NOT NULL,
    "fechaInicio" DATETIME NOT NULL,
    "valorBase" INTEGER NOT NULL,
    "valorActual" INTEGER NOT NULL,
    "glosaCobroMes" TEXT,
    "fechaReajuste" DATETIME NOT NULL,
    "creadoEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Contrato_propiedadId_fkey" FOREIGN KEY ("propiedadId") REFERENCES "Propiedad" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Contrato_arrendatarioId_fkey" FOREIGN KEY ("arrendatarioId") REFERENCES "Arrendatario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pago" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contratoId" INTEGER NOT NULL,
    "fechaPago" DATETIME NOT NULL,
    "monto" INTEGER NOT NULL,
    "enviado" BOOLEAN NOT NULL DEFAULT false,
    "confirmado" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Pago_contratoId_fkey" FOREIGN KEY ("contratoId") REFERENCES "Contrato" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
