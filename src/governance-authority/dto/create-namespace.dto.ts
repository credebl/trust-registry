import { IsString } from 'class-validator';

export class CreateNamespaceDto {
  @IsString()
  name: string;
}