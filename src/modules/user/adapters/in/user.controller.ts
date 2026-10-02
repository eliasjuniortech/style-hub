import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { RegisterUserService } from "../../application/service/register-user.service";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { ResponseUserDto } from "./dtos/response-user.dto";

@Controller("user")
export class UserController {
  private readonly registerUserService: RegisterUserService;

  constructor(registerUserService: RegisterUserService) {
    this.registerUserService = registerUserService;
  }

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async registerUser(@Body() data: RegisterUserDto, @UploadedFile() file?: Express.Multer.File): Promise<ResponseUserDto> {
    const user = await this.registerUserService.execute(data, file);

    return new ResponseUserDto(user.getId(), user.getUsername(), user.getEmail(), user.getAvatar(), user.getCreatedAt(), user.getUpdatedAt());
  }
}
