import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

export const userListByIdService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const userById = await userRepository.findOneBy({
      id: id,
  });

  if (!userById) {
    throw new AppError(404, "User not Found");
  }

  return userById;
};
