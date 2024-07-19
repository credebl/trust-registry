
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
      where: { did: loginDto.did },
    });

    if (!governanceAuthority) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { did: governanceAuthority.did, sub: governanceAuthority.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}