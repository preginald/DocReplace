import { createDoc } from "~~/server/database/repositories/docRepository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await createDoc(body);
});
