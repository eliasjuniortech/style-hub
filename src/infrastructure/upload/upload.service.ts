import { Injectable } from "@nestjs/common";
import { extname } from "node:path";
import { BadRequestException } from "../../shared/exceptions/bad-request.exception";
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
    const path = `${id}/avatar${extension}`;

    const { error } = await client.storage.from("avatars").upload(path, file.buffer, {
      contentType: file.mimetype,
      cacheControl: "3600",
    });
    if (error) {
      throw new BadRequestException("Não foi possível processar o envio da imagem.");
    }

    return path;
  }
}
