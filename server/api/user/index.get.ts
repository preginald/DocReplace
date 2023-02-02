import { getUsers } from "~/server/database/repositories/userRepository";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const users = await getUsers();

  return users;
});
