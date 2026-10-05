export abstract class UploadRepository {
  abstract save(id: string, file: Express.Multer.File): Promise<string>;
  abstract remove(path: string): Promise<void>;
}
