import DocModel from "~~/server/models/Doc.model";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const id = event.context.params.id;
  try {
    await DocModel.findByIdAndDelete(id);
    return { message: "Doc removed" };
  } catch (e) {
    throw createError({
      message: e.message,
    });
  }
});
