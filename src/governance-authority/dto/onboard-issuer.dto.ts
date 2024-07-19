import { IsString, IsArray, IsEnum, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { SchemaType } from '@prisma/client';
import { IsValidSchema } from '../../common/decorators/schema-validator.decorator';

class NewSchemaDto {
  @IsString()
  name: string;

  @IsEnum(SchemaType)
  type: SchemaType;

  @IsString()
  @IsOptional()
  w3cUri?: string;

  @IsString()
  @IsOptional()
  anonCredsSchemaId?: string;

  @IsValidSchema()
  _: any;
}

export class OnboardIssuerDto {
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
  existingSchemaIds?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NewSchemaDto)
  @IsOptional()
  newSchemas?: NewSchemaDto[];
}