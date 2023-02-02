import prisma from "../client";

export async function getUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}
