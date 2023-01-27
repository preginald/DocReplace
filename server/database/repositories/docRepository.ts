import prisma from "../client";

export async function createDoc(data: any) {
  const authorId = "7c96e0b5-9dd9-11ed-b676-0242ac110011";
  const title = data.title;
  const doc = await prisma.doc.create({
    data: {
      title,
      author: {
        connect: {
          id: authorId,
        },
      },
    },
  });
  return doc;
}
export async function getDocs() {
  return await prisma.doc.findMany({
    include: { author: true },
  });
}
