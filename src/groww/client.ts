import { config } from "../config/config.js";

export class GrowwClient {
  private readonly baseUrl = "https://api.groww.in";

  private getHeaders(): HeadersInit {
    return {
      "Authorization": `Bearer ${config.groww.accessToken}`,
      "Content-Type": "application/json"
    };
  }

  async get<T>(path: string): Promise<T> {
    const url = `${this.baseUrl}${path}`;

    const response = await fetch(url, {
      method: "GET",
      headers: this.getHeaders()
    });

    const text = await response.text();

    let data: unknown;

    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    if (!response.ok) {
      throw new Error(
        `Groww API error ${response.status}: ${JSON.stringify(data)}`
      );
    }

    return data as T;
  }
}