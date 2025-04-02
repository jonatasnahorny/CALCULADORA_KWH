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
