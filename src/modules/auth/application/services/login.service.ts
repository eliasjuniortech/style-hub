import { Injectable } from "@nestjs/common";
import { HashingRepository } from "../../../../infrastructure/security/hashing/hashing.repository";
import { InvalidCredentialsException } from "../../../../shared/exceptions/invalid-credentials.exception";
import { LoginDto } from "../../adapters/in/dtos/login.dto";
import { AuthRepository } from "../../domain/repository/auth.repository";
import { JwtRepository } from "../../domain/repository/jwt.repository";

@Injectable()
export class LoginService {
  private readonly authRepository: AuthRepository;
  private readonly hashingRepository: HashingRepository;
  private readonly jwtRepository: JwtRepository;

  constructor(authRepository: AuthRepository, hashingRepository: HashingRepository, jwtRepository: JwtRepository) {
    this.authRepository = authRepository;
    this.hashingRepository = hashingRepository;
    this.jwtRepository = jwtRepository;
  }

  async execute(input: LoginDto): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.authRepository.findUserByEmail(input.email);
    if (!user) {
      throw new InvalidCredentialsException();
    }

    const isPasswordValid = await this.hashingRepository.verify(user.getPassword(), input.password);
    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    const accessToken = await this.jwtRepository.generateAccessToken({ sub: user.getId(), email: user.getEmail() });
    const refreshToken = await this.jwtRepository.generateRefreshToken({ sub: user.getId(), email: user.getEmail() });

    return { accessToken: accessToken, refreshToken: refreshToken };
  }
}
