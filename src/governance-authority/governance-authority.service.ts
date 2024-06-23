// src/governance-authority/governance-authority.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGovernanceAuthorityDto } from './dto/create-governance-authority.dto';

@Injectable()
export class GovernanceAuthorityService {
  constructor(private prisma: PrismaService) {}

  async createGovernanceAuthority(data: CreateGovernanceAuthorityDto) {
    return this.prisma.governanceAuthority.create({
      data: {
        name: data.name,
        did: data.did,
      },
    });
  }
}