import { createDoc } from "~/server/database/repositories/docRepository";

export default defineEventHandler(async (event) => {
  const data = await readBody(event);

  const newDoc = await createDoc(data);

  return newDoc;
});
