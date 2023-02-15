import { getLanguages } from "~~/server/database/repositories/languageRepository";

export default defineEventHandler(async (event) => {
  return await getLanguages();
});
