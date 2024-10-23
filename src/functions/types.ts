import { LAPTOP_COLUMNS } from "../utils/utils";

export type RecordType = {
  [key in (typeof LAPTOP_COLUMNS)[number]]: string;
};

export type CSVObject = {
  columns: string[];
  records: RecordType[];
};
