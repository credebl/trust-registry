/*
  Warnings:

  - You are about to drop the column `organizationId` on the `Schema` table. All the data in the column will be lost.
  - Added the required column `issuerId` to the `Schema` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Schema" DROP CONSTRAINT "Schema_organizationId_fkey";

-- AlterTable
ALTER TABLE "Schema" DROP COLUMN "organizationId",
ADD COLUMN     "issuerId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_VerifierSchemas" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_VerifierSchemas_AB_unique" ON "_VerifierSchemas"("A", "B");

-- CreateIndex
CREATE INDEX "_VerifierSchemas_B_index" ON "_VerifierSchemas"("B");

-- AddForeignKey
ALTER TABLE "Schema" ADD CONSTRAINT "Schema_issuerId_fkey" FOREIGN KEY ("issuerId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VerifierSchemas" ADD CONSTRAINT "_VerifierSchemas_A_fkey" FOREIGN KEY ("A") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VerifierSchemas" ADD CONSTRAINT "_VerifierSchemas_B_fkey" FOREIGN KEY ("B") REFERENCES "Schema"("id") ON DELETE CASCADE ON UPDATE CASCADE;
