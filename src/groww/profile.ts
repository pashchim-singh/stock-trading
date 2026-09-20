import { GrowwClient } from "./client.js";

export interface GrowwProfile {
  [key: string]: unknown;
}

export class GrowwProfileService {
  constructor(private readonly client: GrowwClient) {}

  async getProfile(): Promise<GrowwProfile> {
    return this.client.get<GrowwProfile>(
      "/v1/user/profile"
    );
  }
}