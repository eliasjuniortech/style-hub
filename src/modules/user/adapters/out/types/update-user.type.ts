export type UpdateUser = Partial<{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string | null;
}>;
