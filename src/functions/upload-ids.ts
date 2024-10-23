import { ApiClient, requests } from "recombee-api-client";
import { client } from "../lib/recombee-client";

export async function example() {
  // Prepare some userIDs and itemIDs
  const NUM = 100;
  const userIds = Array.from({ length: NUM }).map((_, i) => {
    return `user-${i}`;
  });
  const itemIds = Array.from({ length: NUM }).map((_, i) => {
    return `item-${i}`;
  });

  // Generate some random purchases of items by users
  const PROBABILITY_PURCHASED = 0.1;
  const purchases: any[] = [];
  userIds.forEach((userId) => {
    const purchased = itemIds.filter(
      () => Math.random() < PROBABILITY_PURCHASED
    );
    purchased.forEach((itemId) => {
      purchases.push(
        new requests.AddPurchase(userId, itemId, {
          cascadeCreate: true,
        })
      );
    });
  });
  console.log(client);
  // Send the data to Recombee, use Batch for faster processing of larger data
  await client.send(new requests.Batch(purchases));

  //Get 5 recommended items for user 'user-25'
  const response = await client.send(
    new requests.RecommendItemsToUser("user-25", 5)
  );
  console.log("Recommended items for user-25: %j", response.recomms);
  // User scrolled down - get next 3 recommended items
  const response2 = await client.send(
    new requests.RecommendNextItems(response.recommId, 3)
  );
  console.log("Next recommended items for user-25: %j", response2.recomms);
}
