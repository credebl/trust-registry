import { IsString, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSchemaDto } from './create-schema.dto';

export class OnboardIssuerDto {
  @IsString()
  name: string;

  @IsString()
  did: string;

  @IsString()
  namespaceId: string;

  @IsString()
  assuranceLevelId: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  existingSchemaIds?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSchemaDto)
  newSchemas?: CreateSchemaDto[];
}