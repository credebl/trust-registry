// src/app.module.ts
import { Module } from '@nestjs/common';
import { GovernanceAuthorityModule } from './governance-authority/governance-authority.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, GovernanceAuthorityModule],
})
export class AppModule {}