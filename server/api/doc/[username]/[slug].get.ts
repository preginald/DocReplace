import { getDocBySlugAndUsername } from "~/server/database/repositories/docRepository";

export default defineEventHandler(async (event) => {
  const { username, slug } = event.context.params;

  const doc = await getDocBySlugAndUsername(slug, username);
  return doc;
});
