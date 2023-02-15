import LanguageModel from "~~/server/models/Language.model";

export async function getLanguages() {
  return await LanguageModel.find();
}
