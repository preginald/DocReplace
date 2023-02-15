import DocModel from "~~/server/models/Doc.model";
import UserModel from "~~/server/models/User.model";

export async function createDoc(data: any) {
  try {
    await DocModel.create(removeClassIds(data));

    return { message: "Doc created" };
  } catch (e) {
    throw createError({
      message: e.message,
    });
  }
}

export async function updateDocById(id: string, data: any) {
  data = removeClassIds(data);
  const doc = await DocModel.findByIdAndUpdate(id, data, { new: true })
    .populate("author")
    .populate({ path: "steps.tasks.language" });

  return doc;
}

export async function getDocById(id: string) {
  const doc = await DocModel.findById(id)
    .populate("author")
    .populate({ path: "steps.tasks.language" });

  return doc;
}

export async function getDocBySlugAndUsername(slug: string, name: string) {
  const user = await UserModel.findOne({ name });

  if (!user) {
    throw new Error("User with name ${name} not found");
  }

  const author = user.id;

  const doc = await DocModel.findOne({ author, slug })
    .populate("author")
    .populate({ path: "steps.tasks.language" });

  return doc;
}

export function removeClassIds(data: {
  title: string;
  slug: string;
  author: string;
  inputs: Input[];
  steps: Step[];
  status: string;
}) {
  data.inputs = data.inputs.map((input) => {
    delete input.class;
    return input;
  });

  data.steps = data.steps.map((step) => {
    delete step.id;
    step.tasks = step.tasks.map((task) => {
      delete task.id;
      task.language = task.language._id;
      return task;
    });
    return step;
  });

  return data;
}
