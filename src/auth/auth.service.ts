import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto) {
    const governanceAuthority = await this.prisma.governanceAuthority.findUnique({
      where: { id: loginDto.id },
    });

    if (!governanceAuthority) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { id: governanceAuthority.id, sub: governanceAuthority.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}