export abstract class HashingRepository {
  abstract hash(password: string): Promise<string>;
  abstract verify(hash: string, password: string): Promise<boolean>;
}
