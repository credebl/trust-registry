import { IsString, IsOptional, IsEnum } from 'class-validator';

export class OnboardRegistryDto {
  @IsString()
  name: string;

  @IsString()
  did: string;

  @IsOptional()
  @IsString()
  namespaceId: string;

  @IsOptional()
  @IsString()
  assuranceLevelId: string;

  @IsOptional()
  attributes?: any; // Change this if you have a specific structure for attributes
}
