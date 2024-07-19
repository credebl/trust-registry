/*
  Warnings:

  - You are about to drop the column `definition` on the `Schema` table. All the data in the column will be lost.
  - You are about to drop the column `issuerId` on the `Schema` table. All the data in the column will be lost.
  - You are about to drop the `Credential` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CredentialDefinition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RevocationRegistry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_VerifierSchemas` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `assuranceLevelId` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namespaceId` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `Schema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Schema` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SchemaType" AS ENUM ('W3C', 'ANONCREDS');

-- DropForeignKey
ALTER TABLE "Credential" DROP CONSTRAINT "Credential_definitionId_fkey";

-- DropForeignKey
ALTER TABLE "Credential" DROP CONSTRAINT "Credential_revocationRegistryId_fkey";

-- DropForeignKey
ALTER TABLE "Credential" DROP CONSTRAINT "Credential_schemaId_fkey";

-- DropForeignKey
ALTER TABLE "Schema" DROP CONSTRAINT "Schema_issuerId_fkey";

-- DropForeignKey
ALTER TABLE "_VerifierSchemas" DROP CONSTRAINT "_VerifierSchemas_A_fkey";

-- DropForeignKey
ALTER TABLE "_VerifierSchemas" DROP CONSTRAINT "_VerifierSchemas_B_fkey";

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "assuranceLevelId" TEXT NOT NULL,
ADD COLUMN     "namespaceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Schema" DROP COLUMN "definition",
DROP COLUMN "issuerId",
ADD COLUMN     "anonCredsDefinitionId" TEXT,
ADD COLUMN     "organizationId" TEXT NOT NULL,
ADD COLUMN     "type" "SchemaType" NOT NULL,
ADD COLUMN     "w3cUri" TEXT;

-- DropTable
DROP TABLE "Credential";

-- DropTable
DROP TABLE "CredentialDefinition";

-- DropTable
DROP TABLE "RevocationRegistry";

-- DropTable
DROP TABLE "_VerifierSchemas";

-- DropEnum
DROP TYPE "CredentialType";

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_namespaceId_fkey" FOREIGN KEY ("namespaceId") REFERENCES "Namespace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_assuranceLevelId_fkey" FOREIGN KEY ("assuranceLevelId") REFERENCES "AssuranceLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schema" ADD CONSTRAINT "Schema_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
