import prisma from "../client";

export async function createOrUpdateUser(data) {
  const username = data.user.name;
  const email = data.user.email;
  const image = data.user.image;
  const update = await prisma.user.upsert({
    where: {
      username: username,
    },
    create: {
      email,
      username,
      image,
    },
    update: {
      email,
      username,
      image,
    },
  });
  return update;
}

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

export async function getUserIdByName(username: string) {
  return await prisma.user.findUnique({
    where: {
      username,
    },
  });
}
