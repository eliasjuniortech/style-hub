export class ResponseUserDto {
  private readonly id: string;
  private readonly firstName: string;
  private readonly lastName: string;
  private readonly email: string;
  private readonly avatar: string | null;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;

  constructor(id: string, firstName: string, lastName: string, email: string, avatar: string | null, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.avatar = avatar;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
