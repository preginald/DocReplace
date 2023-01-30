import prisma from "../client";

export async function createDoc(data: any) {
  console.log(data);

  const authorId = "7c96e0b5-9dd9-11ed-b676-0242ac110011";
  const title = data.title;
  const slug = data.slug;
  const steps = data.steps;
  const inputs = data.inputs;

  const doc = await prisma.doc.create({
    data: {
      title,
      slug,
      author: {
        connect: {
          id: authorId,
        },
      },
      inputs: {
        create: inputs.map((input: any) => {
          return {
            label: input.label,
            name: input.name,
            value: input.value,
          };
        }),
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
      inputs: true,
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
      inputs: true,
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

export async function getDocBySlugAndUsername(slug: string, username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    select: { id: true },
  });

  if (!user) {
    throw new Error(`User with username ${username} not found`);
  }

  const doc = await prisma.doc.findUnique({
    where: {
      slug_userId: {
        slug: slug,
        userId: user.id,
      },
    },
    include: {
      author: true,
      inputs: true,
      steps: { include: { tasks: true } },
    },
  });

  return doc;
}
