import { getDocById } from "~~/server/database/repositories/docRepository";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const doc = await getDocById(id);
  return doc;
});
