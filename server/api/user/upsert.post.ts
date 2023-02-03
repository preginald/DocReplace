import { createOrUpdateUser } from "~/server/database/repositories/userRepository";

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  return await createOrUpdateUser(data);
});
