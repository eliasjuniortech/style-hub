import { AuthGuard } from "@nestjs/passport";
import { AuthenticationRequiredException } from "../../../../../shared/exceptions/authentication-required.exception";

export class AccessTokenGuard extends AuthGuard("access_token") {
  handleRequest<TUser = any>(err: any, user: TUser): TUser {
    if (err || !user) {
      throw new AuthenticationRequiredException();
    }
    return user;
  }
}
