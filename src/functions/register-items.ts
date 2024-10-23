import { requests as rqs } from "recombee-api-client";
import { LAPTOP_PROPERTY_TYPES } from "../utils/utils";
import { client } from "../lib/recombee-client";
import { RecordType } from "./types";

export async function registerItems(columns: string[], records: RecordType[]) {
  // send item properties
  const addItemPropertyRequests = columns.map(
    (propertyName) =>
      new rqs.AddItemProperty(
        propertyName,
        LAPTOP_PROPERTY_TYPES[propertyName].type
      )
  );

  await client.send(new rqs.Batch(addItemPropertyRequests));

  // send item id & item values
  const setItemValueRequests = records.map(
    (record, recordIdx) =>
      new rqs.SetItemValues(`laptop-${recordIdx}`, record, {
        cascadeCreate: true,
      })
  );
  await client.send(new rqs.Batch(setItemValueRequests));
}
