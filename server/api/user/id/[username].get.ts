import { getUserIdByName } from "~/server/database/repositories/userRepository";

export default defineEventHandler(async (event) => {
  const username = event.context.params.username;

  return await getUserIdByName(username);
});
