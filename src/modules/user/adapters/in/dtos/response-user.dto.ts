export class ResponseUserDto {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly avatar: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;

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
