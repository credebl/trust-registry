import { IsString, IsArray, IsOptional } from 'class-validator';
export class OnboardVerifierDto {
  @IsString()
  name: string;

  @IsString()
  did: string;

  @IsString()
  namespaceId: string;

  @IsString()
  assuranceLevelId: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  schemaIds?: string[];

  @IsArray()
  @IsString({ each: true })
  attributes:string[];
}