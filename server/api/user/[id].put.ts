import DocModel from "~~/server/models/Doc.model";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const id = event.context.params.id;
  try {
    await DocModel.findByIdAndUpdate(id, body);
    return { message: "Doc updated" };
  } catch (e) {
    throw createError({
      message: e.message,
    });
  }
});
