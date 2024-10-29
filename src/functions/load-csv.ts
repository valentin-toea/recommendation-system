import { parse } from "csv-parse";
import * as fs from "fs";
import { CSVObject } from "../types/types";
import { handleError } from "../utils/handle-error";

const convertValueToType = (value: string, type: string) => {
  switch (type) {
    case "int":
    case "double":
      return Number(value);
    case "boolean":
      return value === "true";
    default:
      return value;
  }
};

const transformArrayToMap = (
  input: string[],
  columns: string[],
  columnTypes: Record<string, string>
) => {
  return input.reduce(
    (map, currValue, idx) => ({
      ...map,
      [columns[idx]]: convertValueToType(currValue, columnTypes[columns[idx]]),
    }),
    {}
  );
};

export async function loadCSV<T>(
  fileLocation: string,
  columns: string[] = [],
  columnTypes: Record<string, string> = {}
): Promise<CSVObject<T>> {
  try {
    const records: T[] = [];
    const parser = fs.createReadStream(fileLocation).pipe(
      parse({
        to: 300,
      })
    );

    for await (const record of parser) {
      records.push(transformArrayToMap(record, columns, columnTypes) as T);
    }

    if (!records[0]) throw new Error("Empty CSV File.");
    return { records: records.slice(1) };
  } catch (err) {
    handleError(err);
    return { records: [] };
  }
}
