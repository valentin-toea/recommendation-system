import { parse } from "csv-parse";
import * as fs from "fs";
import { LAPTOP_COLUMNS, LAPTOP_PROPERTY_TYPES } from "../utils/utils";
import { CSVObject } from "./types";

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

const transformArrayToMap = (input: string[]) => {
  return input.reduce(
    (map, currValue, idx) => ({
      ...map,
      [LAPTOP_COLUMNS[idx]]: convertValueToType(
        currValue,
        LAPTOP_PROPERTY_TYPES[LAPTOP_COLUMNS[idx]].type
      ),
    }),
    {}
  );
};

// https://www.kaggle.com/datasets/juanmerinobermejo/laptops-price-dataset?resource=download
export async function loadCSV(): Promise<CSVObject> {
  try {
    const records = [];
    const parser = fs.createReadStream(`resources/laptops.csv`).pipe(
      parse({
        to: 300,
      })
    );

    for await (const record of parser) {
      records.push(transformArrayToMap(record));
    }

    if (!records[0]) throw new Error("Empty CSV File.");

    return { columns: LAPTOP_COLUMNS, records: records.slice(1) };
  } catch (e) {
    console.error((e as Error).message);
    return { columns: [], records: [] };
  }
}
