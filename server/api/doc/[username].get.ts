import { getUserDocs } from "~~/server/database/repositories/docRepository";

export default defineEventHandler(async (event) => {
  const username = event.context.params.username;
  const docs = await getUserDocs(username);

  return docs;
});
