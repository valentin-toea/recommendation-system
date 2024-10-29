export function handleError(e: any) {
  console.error("Error: ", (e as Error).message);
}
