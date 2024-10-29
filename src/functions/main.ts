import { requests } from "recombee-api-client";
import { client } from "../lib/recombee-client";
import {
  LAPTOP_COLUMNS,
  LAPTOP_PROPERTIES,
  LAPTOPS_FILE_LOCATION,
  USER_COLUMNS,
  USER_PROPERTIES,
  USERS_FILE_LOCATION,
} from "../utils/const";
import { loadCSV } from "./load-csv";
import { registerItems } from "./register-items";
import { registerUsers } from "./register-users";
import { LaptopRecord, UserRecord } from "../types/types";
import { generateInteractions } from "./generate-interactions";
import { generateRecommendations } from "./generate-recommendations";
import { handleError } from "../utils/handle-error";
import { sleep } from "../utils/utils";

export async function main() {
  try {
    await client.send(new requests.ResetDatabase());

    const { records: laptopRecords } = await loadCSV<LaptopRecord>(
      LAPTOPS_FILE_LOCATION,
      LAPTOP_COLUMNS,
      LAPTOP_PROPERTIES
    );

    const { records: userRecords } = await loadCSV<UserRecord>(
      USERS_FILE_LOCATION,
      USER_COLUMNS,
      USER_PROPERTIES
    );

    await registerItems(laptopRecords);
    await registerUsers(userRecords);
    await sleep(5000);

    await generateInteractions();

    await generateRecommendations();

    console.log("Code ended successfully");
  } catch (err) {
    console.log("Code failed");
    handleError(err);
  }
}
