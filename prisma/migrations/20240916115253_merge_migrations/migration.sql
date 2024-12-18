-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('ISSUER', 'VERIFIER', 'TRUST_REGISTRY');

-- CreateEnum
CREATE TYPE "SchemaType" AS ENUM ('W3C', 'ANONCREDS');

-- CreateEnum
CREATE TYPE "AuthorizationStatus" AS ENUM ('NOT_FOUND', 'CURRENT', 'EXPIRED', 'TERMINATED', 'REVOKED');

-- CreateTable
CREATE TABLE "GovernanceAuthority" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "did" TEXT NOT NULL,
    "type" TEXT,
    "serviceEndpoint" TEXT,
    "relatedAuthorities" TEXT[],

    CONSTRAINT "GovernanceAuthority_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "did" TEXT NOT NULL,
    "type" "EntityType" NOT NULL,
    "governanceAuthorityId" TEXT NOT NULL,
    "namespaceId" TEXT NOT NULL,
    "assuranceLevelId" TEXT NOT NULL,
    "onboardedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attributes" JSONB,
    "authorization" "AuthorizationStatus" NOT NULL,

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schema" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "SchemaType" NOT NULL,
    "w3cUri" TEXT,
    "anonCredsSchemaId" TEXT,
    "entityId" TEXT,
    "governanceAuthorityId" TEXT NOT NULL,

    CONSTRAINT "Schema_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "GovernanceAuthority_did_key" ON "GovernanceAuthority"("did");

-- CreateIndex
CREATE UNIQUE INDEX "GovernanceAuthority_serviceEndpoint_key" ON "GovernanceAuthority"("serviceEndpoint");

-- CreateIndex
CREATE UNIQUE INDEX "Entity_did_key" ON "Entity"("did");

-- CreateIndex
CREATE UNIQUE INDEX "Namespace_name_key" ON "Namespace"("name");

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_governanceAuthorityId_fkey" FOREIGN KEY ("governanceAuthorityId") REFERENCES "GovernanceAuthority"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_namespaceId_fkey" FOREIGN KEY ("namespaceId") REFERENCES "Namespace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_assuranceLevelId_fkey" FOREIGN KEY ("assuranceLevelId") REFERENCES "AssuranceLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schema" ADD CONSTRAINT "Schema_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schema" ADD CONSTRAINT "Schema_governanceAuthorityId_fkey" FOREIGN KEY ("governanceAuthorityId") REFERENCES "GovernanceAuthority"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Namespace" ADD CONSTRAINT "Namespace_governanceAuthorityId_fkey" FOREIGN KEY ("governanceAuthorityId") REFERENCES "GovernanceAuthority"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssuranceLevel" ADD CONSTRAINT "AssuranceLevel_governanceAuthorityId_fkey" FOREIGN KEY ("governanceAuthorityId") REFERENCES "GovernanceAuthority"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
