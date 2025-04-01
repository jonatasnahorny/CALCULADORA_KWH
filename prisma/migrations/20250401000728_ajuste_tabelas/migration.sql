/*
  Warnings:

  - You are about to drop the `fatura` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `leitura_sub_relogio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `relogio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "fatura" DROP CONSTRAINT "fatura_relogio_id_fkey";

-- DropForeignKey
ALTER TABLE "leitura_sub_relogio" DROP CONSTRAINT "leitura_sub_relogio_fatura_id_fkey";

-- DropForeignKey
ALTER TABLE "leitura_sub_relogio" DROP CONSTRAINT "leitura_sub_relogio_relogio_id_fkey";

-- DropForeignKey
ALTER TABLE "relogio" DROP CONSTRAINT "relogio_principal_id_fkey";

-- DropTable
DROP TABLE "fatura";

-- DropTable
DROP TABLE "leitura_sub_relogio";

-- DropTable
DROP TABLE "relogio";

-- CreateTable
CREATE TABLE "relogio_principal" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "referencia" TIMESTAMP(3) NOT NULL,
    "kwh_fatura" DECIMAL(65,30) NOT NULL,
    "valor_fatura" DECIMAL(65,30) NOT NULL,
    "observacao" TEXT,

    CONSTRAINT "relogio_principal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_relogio" (
    "id" SERIAL NOT NULL,
    "id_relogio_principal" INTEGER NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "referencia" TIMESTAMP(3) NOT NULL,
    "kwh_acumulado" DECIMAL(65,30) NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "observacao" TEXT,

    CONSTRAINT "sub_relogio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sub_relogio" ADD CONSTRAINT "sub_relogio_id_relogio_principal_fkey" FOREIGN KEY ("id_relogio_principal") REFERENCES "relogio_principal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
