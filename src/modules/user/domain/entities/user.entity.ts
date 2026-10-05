export class User {
  private readonly id: string;
  private readonly firstName: string;
  private readonly lastName: string;
  private readonly email: string;
  private readonly password: string;
  private readonly avatar: string | null;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;

  constructor(id: string, firstName: string, lastName: string, email: string, password: string, avatar: string | null, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(id: string, firstName: string, lastName: string, email: string, password: string, path: string | null, createdAt: Date, updatedAt: Date): User {
    return new User(id, firstName, lastName, email, password, path, createdAt, updatedAt);
  }

  getId(): string {
    return this.id;
  }
  getFirstName(): string {
    return this.firstName;
  }
  getLastName(): string {
    return this.lastName;
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
