import { requests } from "recombee-api-client";
import { client } from "../lib/recombee-client";
import { loadCSV } from "./load-csv";
import { registerItems } from "./register-items";

export async function main(): Promise<void> {
  const { columns, records } = await loadCSV();

  // await client.send(new requests.ResetDatabase());
  await registerItems(columns, records);

  return Promise.resolve();
}
