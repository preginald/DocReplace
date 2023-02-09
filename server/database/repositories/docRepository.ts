import prisma from "../client";

export async function createDoc(data: any) {
  const authorId = data.userId;
  const title = data.title;
  const slug = data.slug;
  const steps = data.steps;
  const inputs = data.inputs;
  const status = data.status;

  const doc = await prisma.doc.create({
    include: {
      author: true,
      inputs: true,
      steps: { include: { tasks: { include: { language: true } } } },
    },
    data: {
      title,
      slug,
      author: {
        connect: {
          id: authorId,
        },
      },
      status,
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
                  order: task.order,
                  intro: task.intro,
                  input: task.input,
                  output: task.output ? task.output : null,
                  language: {
                    connect: {
                      id: task.language.id ? task.language.id : "blank",
                    },
                  },
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
          tasks: { include: { language: true } },
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
      steps: { include: { tasks: { include: { language: true } } } },
    },
  });

  return doc;
}

export async function updateDoc(id: string, data: any) {
  await prisma.doc.update({
    where: { id },
    data: {
      slug: id,
    },
  });
  const doc = await createDoc(data);
  const deletedDoc = await deleteDoc(id);
  return doc;
}

export async function editDoc(id: string, data: any) {
  const docId = data.id;
  const authorId = data.userId;
  const title = data.title;
  const slug = data.slug;
  const steps = data.steps;
  const inputs = data.inputs;
  const status = data.status;

  let doc = await prisma.doc.update({
    where: {
      id,
    },
    data: {
      status,
    },
    include: {
      author: true,
      inputs: true,
      steps: { include: { tasks: { include: { language: true } } } },
    },
  });

  return doc;
}

export async function deleteDoc(id: string) {
  const doc = await prisma.doc.delete({
    where: {
      id,
    },
  });
  return doc;
}
