import { LAPTOP_PROPERTIES, USER_PROPERTIES } from "../utils/const";

export type CSVObject<T> = {
  records: T[];
};

type LaptopProperty = keyof typeof LAPTOP_PROPERTIES;

export type LaptopRecord = {
  [key in LaptopProperty]: string;
};

export type Laptop = LaptopRecord & { productId: string };

type UserProperty = keyof typeof USER_PROPERTIES;

export type UserRecord = {
  [key in UserProperty]: string;
};

export type User = UserRecord & { userId: string };
