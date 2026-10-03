import { AuthGuard } from "@nestjs/passport";
import { UnauthorizedException } from "../../../../../shared/exceptions/unauthorized.exception";

export class AccessTokenGuard extends AuthGuard("access_token") {
  handleRequest<TUser = any>(err: any, user: TUser): TUser {
    if (err || !user) {
      throw new UnauthorizedException("O token de atualização é inválido ou expirou.");
    }
    return user;
  }
}
