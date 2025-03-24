/*
  Warnings:

  - You are about to drop the `Fatura` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LeituraSubRelogio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Relogio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FaturaRelogio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LeituraSubRelogio" DROP CONSTRAINT "LeituraSubRelogio_faturaId_fkey";

-- DropForeignKey
ALTER TABLE "LeituraSubRelogio" DROP CONSTRAINT "LeituraSubRelogio_relogioId_fkey";

-- DropForeignKey
ALTER TABLE "Relogio" DROP CONSTRAINT "Relogio_principalId_fkey";

-- DropForeignKey
ALTER TABLE "_FaturaRelogio" DROP CONSTRAINT "_FaturaRelogio_A_fkey";

-- DropForeignKey
ALTER TABLE "_FaturaRelogio" DROP CONSTRAINT "_FaturaRelogio_B_fkey";

-- DropTable
DROP TABLE "Fatura";

-- DropTable
DROP TABLE "LeituraSubRelogio";

-- DropTable
DROP TABLE "Relogio";

-- DropTable
DROP TABLE "_FaturaRelogio";

-- CreateTable
CREATE TABLE "relogio" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "principal_id" INTEGER,
    "ativo" BOOLEAN NOT NULL,

    CONSTRAINT "relogio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leitura_sub_relogio" (
    "id" SERIAL NOT NULL,
    "fatura_id" INTEGER NOT NULL,
    "relogio_id" INTEGER NOT NULL,
    "consumo_kwh" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "leitura_sub_relogio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fatura" (
    "id" SERIAL NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "data_vencimento" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "relogio_id" INTEGER NOT NULL,

    CONSTRAINT "fatura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_relogio_fatura" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_relogio_fatura_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_relogio_fatura_B_index" ON "_relogio_fatura"("B");

-- AddForeignKey
ALTER TABLE "relogio" ADD CONSTRAINT "relogio_principal_id_fkey" FOREIGN KEY ("principal_id") REFERENCES "relogio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leitura_sub_relogio" ADD CONSTRAINT "leitura_sub_relogio_fatura_id_fkey" FOREIGN KEY ("fatura_id") REFERENCES "fatura"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leitura_sub_relogio" ADD CONSTRAINT "leitura_sub_relogio_relogio_id_fkey" FOREIGN KEY ("relogio_id") REFERENCES "relogio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_relogio_fatura" ADD CONSTRAINT "_relogio_fatura_A_fkey" FOREIGN KEY ("A") REFERENCES "fatura"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_relogio_fatura" ADD CONSTRAINT "_relogio_fatura_B_fkey" FOREIGN KEY ("B") REFERENCES "relogio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
