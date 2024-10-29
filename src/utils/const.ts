export const LAPTOPS_FILE_LOCATION = `resources/laptops.csv`;
export const USERS_FILE_LOCATION = "resources/people.csv";

export const LAPTOP_PROPERTIES = {
  laptop: "string",
  status: "string",
  brand: "string",
  model: "string",
  cpu: "string",
  ram: "int",
  storage: "int",
  storageType: "string",
  gpu: "string",
  screen: "double",
  touch: "boolean",
  finalPrice: "double",
} as const;

export const LAPTOP_COLUMNS = Object.keys(LAPTOP_PROPERTIES) as Array<
  keyof typeof LAPTOP_PROPERTIES
>;

export const USER_PROPERTIES = {
  name: "string",
  spId: "string",
  team: "string",
  location: "string",
} as const;

export const USER_COLUMNS = Object.keys(USER_PROPERTIES) as Array<
  keyof typeof USER_PROPERTIES
>;
