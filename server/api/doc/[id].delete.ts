import { deleteDocById } from "~~/server/database/repositories/docRepository";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  return await deleteDocById(id);
});
