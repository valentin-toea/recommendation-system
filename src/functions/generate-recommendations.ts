import { client } from "../lib/recombee-client";
import { requests as rqs } from "recombee-api-client";
import { Recommendation, RecommendationResponse } from "recombee-api-client";

const format = (recomms: Recommendation[]) =>
  recomms.map((recomm) => `\n${JSON.stringify(recomm)}`).toString();

export async function generateRecommendations() {
  const userIds = (await client.send(
    new rqs.ListUsers()
  )) as unknown as string[];

  const selectedUserId = userIds[0];

  // Get 5 recommended items for user 'user-25'
  let response: RecommendationResponse;

  response = await client.send(new rqs.RecommendItemsToUser(selectedUserId, 5));
  console.log(
    `Recommended items for ${selectedUserId}: ${format(response.recomms)}`
  );

  // User scrolled down - get next 3 recommended items
  response = await client.send(
    new rqs.RecommendNextItems(response.recommId, 3)
  );
  console.log(
    `Next recommended items for ${selectedUserId}: ${format(response.recomms)}`
  );
}
