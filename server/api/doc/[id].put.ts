import { updateDocById } from "~~/server/database/repositories/docRepository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = event.context.params.id;
  return updateDocById(id, body);
});
