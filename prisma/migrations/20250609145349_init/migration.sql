-- CreateTable
CREATE TABLE "ContratoArriendo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "arrendatario" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "valorBase" REAL NOT NULL,
    "fechaInicio" DATETIME NOT NULL,
    "fechaReajuste" DATETIME NOT NULL,
    "creadoEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
