import { IsString, IsInt } from 'class-validator';

export class CreateAssuranceLevelDto {
  @IsString()
  name: string;

  @IsInt()
  level: number;
}