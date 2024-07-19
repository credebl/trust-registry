import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GovernanceAuthorityService } from './governance-authority.service';
import { CreateGovernanceAuthorityDto } from './dto/create-governance-authority.dto';
import { OnboardIssuerDto } from './dto/onboard-issuer.dto';
import { OnboardVerifierDto } from './dto/onboard-verifier.dto';
import { CurrentUser } from '../auth/current-user.decorator';
import { Public } from '../auth/public.decorator';
import { CreateAssuranceLevelDto } from './dto/create-assurance-level.dto';
import { CreateNamespaceDto } from './dto/create-namespace.dto';
import { CreateSchemaDto } from './dto/create-schema.dto';

@Controller('registry')
export class GovernanceAuthorityController {
  constructor(
    private readonly governanceAuthorityService: GovernanceAuthorityService,
  ) {}

  @Public()
  @Post()
  async createTrustRegistry(
    @Body() createGovernanceAuthorityDto: CreateGovernanceAuthorityDto,
  ) {
    return this.governanceAuthorityService.createGovernanceAuthority(
      createGovernanceAuthorityDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('onboard-issuer')
  async onboardIssuer(
    @Body() dto: OnboardIssuerDto,
    @CurrentUser() user: { id: string; did: string },
  ) {
    return this.governanceAuthorityService.onboardIssuer(dto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('onboard-verifier')
  async onboardVerifier(
    @Body() dto: OnboardVerifierDto,
    @CurrentUser() user: { id: string; did: string },
  ) {
    return this.governanceAuthorityService.onboardVerifier(dto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('namespace')
  async createNamespace(
    @Body() dto: CreateNamespaceDto,
    @CurrentUser() user: { id: string; did: string },
  ) {
    return this.governanceAuthorityService.createNamespace(dto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('assurance-level')
  async createAssuranceLevel(
    @Body() dto: CreateAssuranceLevelDto,
    @CurrentUser() user: { id: string; did: string },
  ) {
    return this.governanceAuthorityService.createAssuranceLevel(dto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('schema')
  async createSchema(
    @Body() createSchemaDto: CreateSchemaDto, 
    @CurrentUser() user: { id: string; did: string }
  ) {
    return this.governanceAuthorityService.createSchema(createSchemaDto, user.id);
  }

  @Get(':governanceAuthorityId/schema')
  async getSchemasByGovernanceAuthority(@Param('governanceAuthorityId') governanceAuthorityId: string) {
    return this.governanceAuthorityService.getSchemasByGovernanceAuthority(governanceAuthorityId);
  }

  @Get(':registryId/namespaces')
  async getNamespaces(@Param('registryId') registryId: string) {
    return this.governanceAuthorityService.getNamespaces(registryId);
  }

  @Get(':registryId/assurance-levels')
  async getAssuranceLevels(@Param('registryId') registryId: string) {
    return this.governanceAuthorityService.getAssuranceLevels(registryId);
  }

  @Get(':registryId/issuers')
  async getIssuers(@Param('registryId') registryId: string) {
    return this.governanceAuthorityService.getIssuers(registryId);
  }

  @Get(':registryId/verifiers')
  async getVerifiers(@Param('registryId') registryId: string) {
    return this.governanceAuthorityService.getVerifiers(registryId);
  }

  @Get('entities/:entityId')
  async getEntity(@Param('entityId') entityId: string) {
    return this.governanceAuthorityService.getEntity(entityId);
  }

  @Get('entities/:entityId/authorizations')
  async getEntityAuthorizations(@Param('entityId') entityId: string) {
    return this.governanceAuthorityService.getEntityAuthorizations(entityId);
  }
}
