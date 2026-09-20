import "dotenv/config";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}`
    );
  }

  return value;
}

export const config = {
  groww: {
    accessToken: getRequiredEnv("GROWW_ACCESS_TOKEN")
  }
};