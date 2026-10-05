import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import type { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Payload } from "../types/payload.type";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, "access_token") {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies.access_token;
        },
      ]),
      secretOrKey: configService.get<string>("ACCESS_TOKEN_SECRET")!,
      ignoreExpiration: true,
    });
  }

  async validate(payload: Payload): Promise<{ id: string; email: string }> {
    return { id: payload.sub, email: payload.email };
  }
}
