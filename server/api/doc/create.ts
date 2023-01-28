import { createDoc } from "~/server/database/repositories/docRepository";

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  console.log("create.ts:", data);

  const newDoc = await createDoc(data);

  return newDoc;
});
