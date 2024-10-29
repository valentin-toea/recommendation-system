import { client } from "../lib/recombee-client";
import { requests as rqs } from "recombee-api-client";
import sampleSize from "lodash/sampleSize";
import random from "lodash/random";

type RequestsCollection = {
  viewRequests: rqs.AddDetailView[];
  bookmarkRequests: rqs.AddBookmark[];
  purchaseRequests: rqs.AddPurchase[];
  ratingRequests: rqs.AddRating[];
  addToCartRequests: rqs.AddCartAddition[];
};

export async function generateInteractions() {
  const userIds = (await client.send(
    new rqs.ListUsers()
  )) as unknown as string[];

  const itemIds = (await client.send(
    new rqs.ListItems()
  )) as unknown as string[];

  const requests: RequestsCollection = {
    viewRequests: [],
    bookmarkRequests: [],
    purchaseRequests: [],
    ratingRequests: [],
    addToCartRequests: [],
  };

  // every user: view 50 items, bookmark 20, add-to-cart 6-10, purchase 2-5, rate 2-5
  userIds.forEach((userId) => {
    const viewedItemIds = sampleSize(itemIds, 50);

    const bookmarkedItemIds = viewedItemIds.slice(0, 20);
    const addedToCartItemIds = bookmarkedItemIds.slice(0, random(6, 10));

    const purchasedItemIds = addedToCartItemIds.slice(0, random(2, 5));
    const ratedItemIds = purchasedItemIds;

    const viewRequests = viewedItemIds.map(
      (itemId) => new rqs.AddDetailView(userId, itemId)
    );

    const bookmarkRequests = bookmarkedItemIds.map(
      (itemId) => new rqs.AddBookmark(userId, itemId)
    );

    const addToCartRequests = addedToCartItemIds.map(
      (itemId) => new rqs.AddCartAddition(userId, itemId)
    );

    const purchaseRequests = purchasedItemIds.map(
      (itemId) => new rqs.AddPurchase(userId, itemId)
    );

    const ratingRequests = ratedItemIds.map(
      (itemId) => new rqs.AddRating(userId, itemId, random(7, 10))
    );

    requests.viewRequests.push(...viewRequests);
    requests.bookmarkRequests.push(...bookmarkRequests);
    requests.purchaseRequests.push(...purchaseRequests);
    requests.ratingRequests.push(...ratingRequests);
    requests.addToCartRequests.push(...addToCartRequests);
  });

  for await (const request of Object.values(requests)) {
    await client.send(new rqs.Batch(request));
  }

  Object.entries(requests).map(([key, value]) =>
    console.log(
      `Generated ${value.length} interactions for ${key.split("Requests")[0]}`
    )
  );

  console.log("Succesfully generated interactions");
}
