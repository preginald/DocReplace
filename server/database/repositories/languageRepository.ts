import prisma from "../client";

export async function getLanguages() {
  return await prisma.language.findMany();
}

export async function getLanguageById(id: string) {
  return await prisma.language.findUnique({
    where: {
      id,
    },
  });
}
