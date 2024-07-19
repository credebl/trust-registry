-- DropForeignKey
ALTER TABLE "Schema" DROP CONSTRAINT "Schema_organizationId_fkey";

-- AlterTable
ALTER TABLE "Schema" ALTER COLUMN "organizationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Schema" ADD CONSTRAINT "Schema_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
