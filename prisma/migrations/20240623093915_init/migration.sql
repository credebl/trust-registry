-- CreateEnum
CREATE TYPE "OrganizationType" AS ENUM ('ISSUER', 'VERIFIER', 'OTHER_TYPE');

-- CreateEnum
CREATE TYPE "CredentialType" AS ENUM ('ANONCREDS', 'W3C');

-- CreateTable
CREATE TABLE "GovernanceAuthority" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "did" TEXT NOT NULL,

    CONSTRAINT "GovernanceAuthority_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "did" TEXT NOT NULL,
    "type" "OrganizationType" NOT NULL,
    "governanceAuthorityId" TEXT NOT NULL,
    "onboardedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schema" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "definition" JSONB NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "Schema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credential" (
    "id" TEXT NOT NULL,
    "type" "CredentialType" NOT NULL,
    "schemaId" TEXT NOT NULL,
    "definitionId" TEXT NOT NULL,
    "revocationRegistryId" TEXT,

    CONSTRAINT "Credential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CredentialDefinition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "definition" JSONB NOT NULL,

    CONSTRAINT "CredentialDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RevocationRegistry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "definition" JSONB NOT NULL,

    CONSTRAINT "RevocationRegistry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Namespace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "governanceAuthorityId" TEXT NOT NULL,

    CONSTRAINT "Namespace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssuranceLevel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "governanceAuthorityId" TEXT NOT NULL,

    CONSTRAINT "AssuranceLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistryRelationship" (
    "id" TEXT NOT NULL,
    "registryId" TEXT NOT NULL,
    "relatedRegistryId" TEXT NOT NULL,
    "relationshipType" TEXT NOT NULL,

    CONSTRAINT "RegistryRelationship_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GovernanceAuthority_did_key" ON "GovernanceAuthority"("did");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_did_key" ON "Organization"("did");

-- CreateIndex
CREATE UNIQUE INDEX "Namespace_name_key" ON "Namespace"("name");

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_governanceAuthorityId_fkey" FOREIGN KEY ("governanceAuthorityId") REFERENCES "GovernanceAuthority"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schema" ADD CONSTRAINT "Schema_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_schemaId_fkey" FOREIGN KEY ("schemaId") REFERENCES "Schema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_definitionId_fkey" FOREIGN KEY ("definitionId") REFERENCES "CredentialDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_revocationRegistryId_fkey" FOREIGN KEY ("revocationRegistryId") REFERENCES "RevocationRegistry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Namespace" ADD CONSTRAINT "Namespace_governanceAuthorityId_fkey" FOREIGN KEY ("governanceAuthorityId") REFERENCES "GovernanceAuthority"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssuranceLevel" ADD CONSTRAINT "AssuranceLevel_governanceAuthorityId_fkey" FOREIGN KEY ("governanceAuthorityId") REFERENCES "GovernanceAuthority"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistryRelationship" ADD CONSTRAINT "RegistryRelationship_registryId_fkey" FOREIGN KEY ("registryId") REFERENCES "GovernanceAuthority"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistryRelationship" ADD CONSTRAINT "RegistryRelationship_relatedRegistryId_fkey" FOREIGN KEY ("relatedRegistryId") REFERENCES "GovernanceAuthority"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
