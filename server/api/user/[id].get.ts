import { findUserById } from "~~/server/database/repositories/userRepository";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  return await findUserById(id);
});
