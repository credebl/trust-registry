import { IsString, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { SchemaType } from '@prisma/client';

export class CreateSchemaDto {
  @IsString()
  name: string;

  @IsEnum(SchemaType)
  type: SchemaType;

  @IsOptional()
  @IsString()
  w3cUri?: string;

  @IsOptional()
  @IsString()
  anonCredsSchemaId?: string;

  @IsOptional()
  @IsUUID()
  entityId?: string;
}