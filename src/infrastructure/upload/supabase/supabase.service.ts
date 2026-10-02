import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class SupabaseService {
  private readonly client: SupabaseClient;

  constructor(configService: ConfigService) {
    this.client = createClient(configService.get<string>("SUPABASE_URL")!, configService.get<string>("SUPABASE_SECRET")!);
  }

  getClient(): SupabaseClient {
    return this.client;
  }
}
