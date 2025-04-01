/*
  Warnings:

  - You are about to drop the `_relogio_fatura` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_relogio_fatura" DROP CONSTRAINT "_relogio_fatura_A_fkey";

-- DropForeignKey
ALTER TABLE "_relogio_fatura" DROP CONSTRAINT "_relogio_fatura_B_fkey";

-- DropTable
DROP TABLE "_relogio_fatura";

-- AddForeignKey
ALTER TABLE "fatura" ADD CONSTRAINT "fatura_relogio_id_fkey" FOREIGN KEY ("relogio_id") REFERENCES "relogio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
