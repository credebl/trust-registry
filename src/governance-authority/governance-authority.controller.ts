// src/governance-authority/governance-authority.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { GovernanceAuthorityService } from './governance-authority.service';
import { CreateGovernanceAuthorityDto } from './dto/create-governance-authority.dto';

@Controller('registries')
export class GovernanceAuthorityController {
  constructor(private governanceAuthorityService: GovernanceAuthorityService) {}

  @Post()
  async createGovernanceAuthority(@Body() createGovernanceAuthorityDto: CreateGovernanceAuthorityDto) {
    return this.governanceAuthorityService.createGovernanceAuthority(createGovernanceAuthorityDto);
  }
}