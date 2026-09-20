import { GrowwClient } from "./client.js";

export interface LtpResponse {
  status: string;

  payload: Record<string, number>;
}

export class MarketService {

  constructor(
    private readonly client: GrowwClient
  ) {}

  async getLtp(
    symbols: string[]
  ): Promise<LtpResponse> {

    return this.client.get<LtpResponse>(
      "/v1/live-data/ltp",
      {
        segment: "CASH",
        exchange_symbols: symbols.join(",")
      }
    );
  }

  async getRelianceLtp(): Promise<number> {

    const response = await this.getLtp([
      "NSE_RELIANCE"
    ]);

    const ltp =
      response.payload["NSE_RELIANCE"];

    if (typeof ltp !== "number") {
      throw new Error(
        "RELIANCE LTP was not returned by Groww"
      );
    }

    return ltp;
  }
}