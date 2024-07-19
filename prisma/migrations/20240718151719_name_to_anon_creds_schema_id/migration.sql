/*
  Warnings:

  - You are about to drop the column `anonCredsDefinitionId` on the `Schema` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Schema" DROP COLUMN "anonCredsDefinitionId",
ADD COLUMN     "anonCredsSchemaId" TEXT;
