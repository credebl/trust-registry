// src/governance-authority/dto/create-governance-authority.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateGovernanceAuthorityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  did: string;
}