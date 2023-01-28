import prisma from "../client";

export async function createDoc(data: any) {
  console.log(data);

  const authorId = "7c96e0b5-9dd9-11ed-b676-0242ac110011";
  const title = data.title;
  const slug = data.slug;
  const steps = data.steps;

  const doc = await prisma.doc.create({
    data: {
      title,
      slug,
      author: {
        connect: {
          id: authorId,
        },
      },
      steps: {
        create: steps.map((step: any) => {
          return {
            title: step.title,
            order: step.order,
            tasks: {
              create: step.tasks.map((task: any) => {
                return {
                  intro: task.intro,
                  input: task.input,
                  output: task.output,
                };
              }),
            },
          };
        }),
      },
    },
  });
  return doc;
}

export async function getDocs() {
  return await prisma.doc.findMany({
    include: {
      author: true,
      steps: {
        include: {
          tasks: true,
        },
      },
    },
  });
}

export async function getDocById(id: string) {
  return await prisma.doc.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      steps: {
        include: {
          tasks: true,
        },
      },
    },
  });
}

export async function getUserDocs(username: string) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    include: { docs: true },
  });
  return user ? user.docs : null;
}
