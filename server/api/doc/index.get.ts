import { getDocs } from "~~/server/database/repositories/docRepository";

export default defineEventHandler(async (event) => {
  //   const query = getQuery(event);

  const docs = await getDocs();

  return docs;
});
