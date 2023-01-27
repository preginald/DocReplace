import prisma from "../client";

export async function getDocs() {
  return await prisma.doc.findMany();
}
