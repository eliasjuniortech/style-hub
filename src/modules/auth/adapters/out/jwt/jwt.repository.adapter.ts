import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Payload } from "../types/payload.type";
import { JwtRepository } from "../../../domain/repository/jwt.repository";

@Injectable()
export class JwtRepositoryAdapter implements JwtRepository {
  private readonly jwtService: JwtService;
  private readonly configService: ConfigService;

  constructor(jwtService: JwtService, configService: ConfigService) {
    this.jwtService = jwtService;
    this.configService = configService;
  }

  async generateAccessToken(payload: Payload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>("ACCESS_TOKEN_SECRET"),
      expiresIn: Number(this.configService.get<number>("ACCESS_TOKEN_EXPIRES_IN")),
    });
  }

  async generateRefreshToken(payload: Payload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>("REFRESH_TOKEN_SECRET"),
      expiresIn: Number(this.configService.get<number>("REFRESH_TOKEN_EXPIRES_IN")),
    });
  }
}
