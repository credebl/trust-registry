/*
  Warnings:

  - Added the required column `governanceAuthorityId` to the `Schema` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schema" ADD COLUMN     "governanceAuthorityId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Schema" ADD CONSTRAINT "Schema_governanceAuthorityId_fkey" FOREIGN KEY ("governanceAuthorityId") REFERENCES "GovernanceAuthority"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
