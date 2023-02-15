import DocModel from "~~/server/models/Doc.model";

export default defineEventHandler(async (event) => {
  return await DocModel.find().populate("author");
});
