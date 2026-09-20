import crypto from "node:crypto";
import { config } from "../config/config.js";

interface GrowwTokenResponse {
  status?: string;
  token?: string;
  tokenRefId?: string;
  sessionName?: string;
  expiry?: string;
  isActive?: boolean;
  error?: {
    errorCode?: string;
    errorMessage?: string;
  };
}

function generateChecksum(
  secret: string,
  timestamp: string
): string {
  return crypto
    .createHash("sha256")
    .update(secret + timestamp, "utf8")
    .digest("hex");
}

export async function generateAccessToken() {
  const timestamp = Math.floor(
    Date.now() / 1000
  ).toString();

  const checksum = generateChecksum(
    config.groww.apiSecret,
    timestamp
  );

  const requestBody = {
    key_type: "approval",
    checksum: checksum,
    timestamp: timestamp
  };

  console.log("Requesting Groww access token...");
  console.log("Timestamp:", timestamp);

  const response = await fetch(
    "https://api.groww.in/v1/token/api/access",
    {
      method: "POST",

      headers: {
        "Authorization": `Bearer ${config.groww.apiKey}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },

      body: JSON.stringify(requestBody)
    }
  );

  const text = await response.text();

  let data: GrowwTokenResponse;

  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(
      `Invalid response from Groww: ${text}`
    );
  }

  if (!response.ok) {
    throw new Error(
      `Groww authentication failed (${response.status}): ` +
      JSON.stringify(data)
    );
  }

  if (!data.token) {
    throw new Error(
      `Groww did not return an access token: ` +
      JSON.stringify(data)
    );
  }

  return {
    token: data.token,
    tokenRefId: data.tokenRefId,
    sessionName: data.sessionName,
    expiry: data.expiry,
    isActive: data.isActive
  };
}