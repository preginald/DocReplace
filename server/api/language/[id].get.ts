import { getLanguageById } from "~~/server/database/repositories/languageRepository";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const language = await getLanguageById(id);

  return language;
});
