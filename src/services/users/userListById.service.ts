import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

export const userListByIdService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const userById = await userRepository.find({
    relations: {
      address: true,
    },
    where: { id: id },
  });

  if (!userById[0]) {
    throw new AppError(404, "User not Found");
  }

  return userById[0];
};
