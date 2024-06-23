// src/governance-authority/governance-authority.module.ts
import { Module } from '@nestjs/common';
import { GovernanceAuthorityService } from './governance-authority.service';
import { GovernanceAuthorityController } from './governance-authority.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [GovernanceAuthorityService],
  controllers: [GovernanceAuthorityController],
})
export class GovernanceAuthorityModule {}