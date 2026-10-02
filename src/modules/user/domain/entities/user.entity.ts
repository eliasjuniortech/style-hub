export class User {
  private readonly id: string;
  private readonly username: string;
  private readonly email: string;
  private readonly password: string;
  private readonly avatar: string | null;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;

  constructor(id: string, username: string, email: string, password: string, avatar: string | null, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(id: string, username: string, email: string, password: string, avatar: string | null, createdAt: Date, updatedAt: Date): User {
    return new User(id, username, email, password, avatar, createdAt, updatedAt);
  }

  getId(): string {
    return this.id;
  }
  getUsername(): string {
    return this.username;
  }
  getEmail(): string {
    return this.email;
  }
  getPassword(): string {
    return this.password;
  }
  getAvatar(): string | null {
    return this.avatar;
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }
  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
