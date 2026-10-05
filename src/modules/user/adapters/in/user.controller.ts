import { Body, Controller, Delete, Get, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CurrentUser } from "../../../auth/adapters/out/decorators/current-user.decorator";
import { AccessTokenGuard } from "../../../auth/adapters/out/guards/access-token.guard";
import type { AuthenticatedUser } from "../../../auth/adapters/out/types/authenticated-user.type";
import { DeleteUserAvatarService } from "../../application/services/delete-user-avatar.service";
import { DeleteUserService } from "../../application/services/delete-user.service";
import { FindUserService } from "../../application/services/find-user.service";
import { RegisterUserService } from "../../application/services/register-user.service";
import { UpdateUserAvatarService } from "../../application/services/update-user-avatar.service";
import { UpdateUserService } from "../../application/services/update-user.service";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { ResponseUserDto } from "./dtos/response-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";

@Controller("user")
export class UserController {
  private readonly registerUserService: RegisterUserService;
  private readonly findUserService: FindUserService;
  private readonly updateUserService: UpdateUserService;
  private readonly updateAvatarService: UpdateUserAvatarService;
  private readonly removeUserService: DeleteUserService;
  private readonly removeAvatarService: DeleteUserAvatarService;

  constructor(
    registerUserService: RegisterUserService,
    findUserService: FindUserService,
    updateUserService: UpdateUserService,
    updateAvatarService: UpdateUserAvatarService,
    removeUserService: DeleteUserService,
    removeAvatarService: DeleteUserAvatarService,
  ) {
    this.registerUserService = registerUserService;
    this.findUserService = findUserService;
    this.updateUserService = updateUserService;
    this.updateAvatarService = updateAvatarService;
    this.removeUserService = removeUserService;
    this.removeAvatarService = removeAvatarService;
  }

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async registerUser(@Body() body: RegisterUserDto, @UploadedFile() file?: Express.Multer.File): Promise<ResponseUserDto> {
    const user = await this.registerUserService.execute(body, file);

    return new ResponseUserDto(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getAvatar(), user.getCreatedAt(), user.getUpdatedAt());
  }

  @Get("me")
  @UseGuards(AccessTokenGuard)
  async findUser(@CurrentUser() currentUser: AuthenticatedUser): Promise<ResponseUserDto> {
    const user = await this.findUserService.execute(currentUser.email);

    return new ResponseUserDto(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getAvatar(), user.getCreatedAt(), user.getUpdatedAt());
  }

  @Patch("me")
  @UseGuards(AccessTokenGuard)
  async updateUser(@CurrentUser() currentUser: AuthenticatedUser, @Body() body: UpdateUserDto): Promise<ResponseUserDto> {
    const user = await this.updateUserService.execute(currentUser.email, body);

    return new ResponseUserDto(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getAvatar(), user.getCreatedAt(), user.getUpdatedAt());
  }

  @Patch("me/avatar")
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor("file"))
  async updateAvatarUser(@CurrentUser() currentUser: AuthenticatedUser, @UploadedFile() file: Express.Multer.File): Promise<ResponseUserDto> {
    const user = await this.updateAvatarService.execute(currentUser.email, file);

    return new ResponseUserDto(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getAvatar(), user.getCreatedAt(), user.getUpdatedAt());
  }

  @Delete("me")
  @UseGuards(AccessTokenGuard)
  async deleteUser(@CurrentUser() currentUser: AuthenticatedUser): Promise<void> {
    return await this.removeUserService.execute(currentUser.email);
  }

  @Delete("me/avatar")
  @UseGuards(AccessTokenGuard)
  async deleteUserAvatar(@CurrentUser() currentUser: AuthenticatedUser): Promise<void> {
    return await this.removeAvatarService.execute(currentUser.email);
  }
}
