// schema.dto.ts
import { IsString, IsEnum, IsOptional } from 'class-validator';
import { SchemaType } from '@prisma/client';

export class CreateSchemaDto {
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

  @IsString()
  @IsOptional()
  organizationId?: string;
  
}