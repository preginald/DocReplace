import { createUser } from "~~/server/database/repositories/userRepository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return await createUser(body);
});
