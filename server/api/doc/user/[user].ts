import DocModel from "~~/server/models/Doc.model";
import UserModel from "~~/server/models/User.model";

export default defineEventHandler(async (event) => {
  const user = event.context.params.id;

  try {
    const author = await UserModel.findOne({
      "user.name": user,
    });

    const docs = await DocModel.find({
      "author.name": user,
    }).populate("author");
    return docs;
  } catch (e) {
    throw createError({
      message: e.message,
    });
  }
});
