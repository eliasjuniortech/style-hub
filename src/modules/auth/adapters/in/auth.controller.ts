import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Response } from "express";
import { LoginService } from "../../application/services/login.service";
import { JwtRepository } from "../../domain/repository/jwt.repository";
import { AccessTokenGuard } from "../out/guards/access-token.guard";
import { RefreshTokenGuard } from "../out/guards/refresh-token.guard";
import { LoginDto } from "./dtos/login.dto";

@Controller()
export class AuthController {
  private readonly loginService: LoginService;
  private readonly jwtRepository: JwtRepository;
  private readonly configService: ConfigService;

  constructor(loginService: LoginService, jwtRepository: JwtRepository, configService: ConfigService) {
    this.loginService = loginService;
    this.jwtRepository = jwtRepository;
    this.configService = configService;
  }

  @Post("login")
  async login(@Body() data: LoginDto, @Res({ passthrough: true }) res: Response): Promise<{ message: string }> {
    const { accessToken, refreshToken } = await this.loginService.execute(data);

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: this.configService.get<string>("NODE_ENV") === "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: this.configService.get<string>("NODE_ENV") === "development",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { message: "Login realizado com sucesso." };
  }

  @Post("logout")
  @UseGuards(AccessTokenGuard)
  async logout(@Res({ passthrough: true }) res: Response): Promise<{ message: string }> {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    return { message: "Logout realizado com sucesso." };
  }

  @Post("refresh-token")
  @UseGuards(RefreshTokenGuard)
  async refreshToken(@Res({ passthrough: true }) res: Response): Promise<void> {
    const accessToken = await this.jwtRepository.generateAccessToken({ sub: "", email: "" });

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: this.configService.get<string>("NODE_ENV") === "development",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });
  }
}
