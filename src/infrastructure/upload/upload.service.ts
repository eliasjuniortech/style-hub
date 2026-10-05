import { Injectable } from "@nestjs/common";
import { extname } from "node:path";
import { FileStorageException } from "../../shared/exceptions/file-storage.exception";
import { SupabaseService } from "./supabase/supabase.service";
import { UploadRepository } from "./upload.repository";

@Injectable()
export class UploadService implements UploadRepository {
  private readonly supabase: SupabaseService;

  constructor(supabase: SupabaseService) {
    this.supabase = supabase;
  }

  async save(id: string, file: Express.Multer.File): Promise<string> {
    const client = this.supabase.getClient();

    const extension = extname(file.originalname);
    const path = `${id}/${crypto.randomUUID()}${extension}`;

    const { error } = await client.storage.from("avatars").upload(path, file.buffer, {
      contentType: file.mimetype,
      cacheControl: "3600",
      upsert: true,
    });

    if (error) {
      throw new FileStorageException();
    }
    return path;
  }

  async remove(path: string): Promise<void> {
    const client = this.supabase.getClient();

    const { error } = await client.storage.from("avatars").remove([path]);
    if (error) {
      throw new FileStorageException();
    }
  }
}
