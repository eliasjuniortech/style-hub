import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import type { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Payload } from "../../../application/services/types/payload.type";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "refresh_token") {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies.refresh_token;
        },
      ]),
      secretOrKey: configService.get<string>("REFRESH_TOKEN_SECRET")!,
      ignoreExpiration: true,
    });
  }

  async validate(payload: Payload): Promise<{ id: string; email: string }> {
    return { id: payload.sub, email: payload.email };
  }
}
