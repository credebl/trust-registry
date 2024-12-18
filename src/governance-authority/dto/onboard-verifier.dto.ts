import { IsString, IsArray } from 'class-validator';

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
  schemaIds: string[];

  @IsArray()
  @IsString({ each: true })
  attributes: string[];
}