// src/app.module.ts
import { Module } from '@nestjs/common';
import { GovernanceAuthorityModule } from './governance-authority/governance-authority.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [AuthModule,PrismaModule, GovernanceAuthorityModule],
})
export class AppModule {}