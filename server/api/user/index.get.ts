import { getUsers } from "~/server/database/repositories/userRepository";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const users = await getUsers();

  //   return gyms;
  // const users = {
  //   id: "2039i0s9fi09",
  //   username: "preginald",
  // };
  return users;
});
