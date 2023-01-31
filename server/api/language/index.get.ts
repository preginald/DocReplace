import { getLanguages } from "~~/server/database/repositories/languageRepository";

export default defineEventHandler(async (event) => {
  //   const query = getQuery(event);

  const languages = await getLanguages();

  return languages;
});
