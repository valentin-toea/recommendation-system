import { ApiClient } from "recombee-api-client";

export const client = new ApiClient(
  process.env.RECOMBEE_DATABASE_ID!,
  process.env.RECOMBEE_DATABASE_PRIVATE_TOKEN!,
  { region: "eu-west" }
);
