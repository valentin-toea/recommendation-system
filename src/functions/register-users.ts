import { requests as rqs } from "recombee-api-client";
import { USER_COLUMNS, USER_PROPERTIES } from "../utils/const";
import { UserRecord } from "../types/types";
import { client } from "../lib/recombee-client";

export async function registerUsers(records: UserRecord[]) {
  // send user properties
  const addUserPropertyRequests = USER_COLUMNS.map((propertyName) => {
    const propertyType = USER_PROPERTIES[propertyName as keyof UserRecord];
    return new rqs.AddUserProperty(propertyName, propertyType);
  });
  await client.send(new rqs.Batch(addUserPropertyRequests));

  // send user id & user property values
  const setUserValueRequests = records.map(
    (record) =>
      new rqs.SetUserValues(`user-${record.spId}`, record, {
        cascadeCreate: true,
      })
  );
  await client.send(new rqs.Batch(setUserValueRequests));

  console.log("Succesfully registered users");
}
