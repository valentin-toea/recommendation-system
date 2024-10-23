declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RECOMBEE_DATABASE_ID: string;
      RECOMBEE_DATABASE_PRIVATE_TOKEN: string;
    }
  }
}

export {};
