import UserModel from "~~/server/models/User.model";

export async function createUser(data) {
  const email = data.email;
  const user = await UserModel.findOne({ email });

  if (user) {
    return user;
  }

  try {
    await UserModel.create(data);
    return { message: "User created" };
  } catch (e) {
    throw createError({
      message: e.message,
    });
  }
}

export async function findUserById(id) {
  try {
    const user = await UserModel.findOne({ id });
    if (!user) {
      throw createError({
        message: "User not found",
      });
    }
    return user;
  } catch (e) {
    throw createError({
      message: e.message,
    });
  }
}

export async function findUserByEmail(email) {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw createError({
        message: "User not found",
      });
    }
    return user;
  } catch (e) {
    throw createError({
      message: e.message,
    });
  }
}
