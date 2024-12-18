import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateGovernanceAuthorityDto {
  @IsString()
  name: string;

  @IsString()
  did: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  serviceEndpoint?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  relatedAuthorities?: string[];
}