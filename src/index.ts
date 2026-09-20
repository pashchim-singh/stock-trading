import { GrowwClient } from "./groww/client.js";
import { GrowwProfileService } from "./groww/profile.js";

async function main(): Promise<void> {
  console.log("=================================");
  console.log("      Groww Trading Bot");
  console.log("=================================");
  console.log();

  try {
    const client = new GrowwClient();

    const profileService = new GrowwProfileService(client);

    console.log("Connecting to Groww API...");

    const profile = await profileService.getProfile();

    console.log("Connected successfully!");
    console.log();
    console.log("Groww Profile:");
    console.log(JSON.stringify(profile, null, 2));
  } catch (error) {
    console.error();
    console.error("Failed to connect to Groww.");

    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }

    process.exitCode = 1;
  }
}

main();