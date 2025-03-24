-- CreateTable
CREATE TABLE "Relogio" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "principalId" INTEGER,
    "ativo" BOOLEAN NOT NULL,

    CONSTRAINT "Relogio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeituraSubRelogio" (
    "id" SERIAL NOT NULL,
    "faturaId" INTEGER NOT NULL,
    "relogioId" INTEGER NOT NULL,
    "consumoKwh" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "LeituraSubRelogio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fatura" (
    "id" SERIAL NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "dataVencimento" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Fatura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FaturaRelogio" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FaturaRelogio_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FaturaRelogio_B_index" ON "_FaturaRelogio"("B");

-- AddForeignKey
ALTER TABLE "Relogio" ADD CONSTRAINT "Relogio_principalId_fkey" FOREIGN KEY ("principalId") REFERENCES "Relogio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeituraSubRelogio" ADD CONSTRAINT "LeituraSubRelogio_faturaId_fkey" FOREIGN KEY ("faturaId") REFERENCES "Fatura"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeituraSubRelogio" ADD CONSTRAINT "LeituraSubRelogio_relogioId_fkey" FOREIGN KEY ("relogioId") REFERENCES "Relogio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FaturaRelogio" ADD CONSTRAINT "_FaturaRelogio_A_fkey" FOREIGN KEY ("A") REFERENCES "Fatura"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FaturaRelogio" ADD CONSTRAINT "_FaturaRelogio_B_fkey" FOREIGN KEY ("B") REFERENCES "Relogio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
