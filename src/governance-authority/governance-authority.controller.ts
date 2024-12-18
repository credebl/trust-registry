import { Controller, Post, Body, Get, Param, UseGuards,BadRequestException,Query } from '@nestjs/common';
import { GovernanceAuthorityService } from './governance-authority.service';
import { CreateGovernanceAuthorityDto } from './dto/create-governance-authority.dto';
import { OnboardIssuerDto } from './dto/onboard-issuer.dto';
import { OnboardVerifierDto } from './dto/onboard-verifier.dto';
import { CurrentUser } from '../auth/current-user.decorator';
import { Public } from '../auth/public.decorator';
import { CreateAssuranceLevelDto } from './dto/create-assurance-level.dto';
import { CreateNamespaceDto } from './dto/create-namespace.dto';
import { CreateSchemaDto } from './dto/create-schema.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EntityType } from '@prisma/client';
import { OnboardRegistryDto } from './dto/onboard-regstry.dto';
@Controller('/')
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
  @Post('onboard-registry')
  async onboardRegistry(
    @Body() dto: OnboardRegistryDto,
    @CurrentUser() user: { id: string; did: string },
  ) {
    return this.governanceAuthorityService.onboardRegistry(dto, user.id);
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

  @Get(':governanceAuthorityDid/schemas')
  async getSchemasByGovernanceAuthority(@Param('governanceAuthorityDid') governanceAuthorityDid: string) {
    return this.governanceAuthorityService.getSchemasByGovernanceAuthority(governanceAuthorityDid);
  }

  @Get(':registryDid/namespaces')
  async getNamespaces(@Param('registryDid') registryDid: string) {
    return this.governanceAuthorityService.getNamespaces(registryDid);
  }

  @Get(':registryDid/assurance-levels')
  async getAssuranceLevels(@Param('registryDid') registryDid: string) {
    return this.governanceAuthorityService.getAssuranceLevels(registryDid);
  }

  @Get(':registryDid/entities')
  async getEntities(
    @Param('registryDid') registryDid: string,
    @Query('type') type?: EntityType
  ) {
    return this.governanceAuthorityService.getEntities(registryDid, type);
  }

  @Get('entities/:entityDid/authorization')
  async getEntityAuthorization(@Param('entityDid') entityDid: string) {
    return this.governanceAuthorityService.getEntityAuthorization(entityDid);
  }

  /*@Get('service-endpoint/:serviceEndpoint')
  async getGovernanceAuthorityDetails(@Param('serviceEndpoint') serviceEndpoint: string) {
    return this.governanceAuthorityService.getGovernanceAuthorityDetails(serviceEndpoint);
  }*/

  @Get('/did/:did')
  async getEntity(@Param('did') did: string) {
    return this.governanceAuthorityService.getDetailsByDid(did);
  }
  @Get('/registry')
  async getAllDetails() {
    return this.governanceAuthorityService.getAllGovernanceDetails();
  }
}