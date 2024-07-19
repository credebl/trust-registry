import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  did: string;
}