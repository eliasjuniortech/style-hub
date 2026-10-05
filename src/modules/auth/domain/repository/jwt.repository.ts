import { Payload } from "../../adapters/out/types/payload.type";

export abstract class JwtRepository {
  abstract generateAccessToken(payload: Payload): Promise<string>;
  abstract generateRefreshToken(payload: Payload): Promise<string>;
}
