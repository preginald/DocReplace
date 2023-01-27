import prisma from "../client";

export async function getUsers() {
  // return await prisma.user.findMany();
  const users = await prisma.user.findMany();
  console.log(users);
  return users;
}
