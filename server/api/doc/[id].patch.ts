import { editDoc } from "~/server/database/repositories/docRepository";

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  const id = event.context.params.id;

  const doc = await editDoc(id, data);

  return doc;
});
