import { getUserById } from "~/server/database/repositories/userRepository";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  return await getUserById(id);
});
