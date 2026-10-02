export class ResponseUserDto {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly avatar: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(id: string, username: string, email: string, avatar: string | null, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.avatar = avatar;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
