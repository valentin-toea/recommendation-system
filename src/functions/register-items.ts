import { requests as rqs } from "recombee-api-client";
import { LAPTOP_COLUMNS, LAPTOP_PROPERTIES } from "../utils/const";
import { client } from "../lib/recombee-client";
import { LaptopRecord } from "../types/types";

export async function registerItems(records: LaptopRecord[]) {
  // send item properties
  const addItemPropertyRequests = LAPTOP_COLUMNS.map((propertyName) => {
    const propertyType = LAPTOP_PROPERTIES[propertyName as keyof LaptopRecord];
    return new rqs.AddItemProperty(propertyName, propertyType);
  });
  await client.send(new rqs.Batch(addItemPropertyRequests));

  // send item id & item values
  const setItemValueRequests = records.map(
    (record, recordIdx) =>
      new rqs.SetItemValues(`laptop-${recordIdx}`, record, {
        cascadeCreate: true,
      })
  );
  await client.send(new rqs.Batch(setItemValueRequests));

  console.log("Succesfully registered items");
}
