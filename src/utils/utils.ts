export const LAPTOP_COLUMNS = [
  "laptop",
  "status",
  "brand",
  "model",
  "cpu",
  "ram",
  "storage",
  "storageType",
  "gpu",
  "screen",
  "touch",
  "finalPrice",
];

type LaptopPropertyTypes = {
  [key: string]: { type: string };
};

export const LAPTOP_PROPERTY_TYPES: LaptopPropertyTypes = {
  laptop: { type: "string" },
  status: { type: "string" },
  brand: { type: "string" },
  model: { type: "string" },
  cpu: { type: "string" },
  ram: { type: "int" },
  storage: { type: "int" },
  storageType: { type: "string" },
  gpu: { type: "string" },
  screen: { type: "double" },
  touch: { type: "boolean" },
  finalPrice: { type: "double" },
};
