import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { hash } from "bcryptjs";

import { IUserCreate } from "../../interfaces/users";
import { User } from "../../entities/user.entity";
import { Address } from "../../entities/address.entity";

export const userCreateService = async ({
  name,
  password,
  email,
  description,
  isSeller,
  dob,
  phone,
  cpf,
  cep,
  city,
  state,
  street,
  number,
  complement,
}: IUserCreate): Promise<User> => {
  const userRepo = AppDataSource.getRepository(User);
  const addressRepo = AppDataSource.getRepository(Address);

  const emailAlreadyExists = await userRepo.findOneBy({ email: email });
  if (emailAlreadyExists) {
    throw new AppError(409, "Invalid Email");
  }

  const cpfAlreadyExists = await userRepo.findOneBy({ cpf: cpf });
  if (cpfAlreadyExists) {
    throw new AppError(409, "Invalid CPF");
  }

  const addressAlreadyExists = await addressRepo.findOneBy({
    cep: cep,
    city: city,
    state: state,
    street: street,
    number: number,
    complement: complement,
  });

  if (!addressAlreadyExists) {
    var newAddress = addressRepo.create({
      cep,
      city,
      state,
      street,
      number,
      complement,
    });
    await addressRepo.save(newAddress);
  }

  const hashedPassword = await hash(password, 10);

  const user = userRepo.create({
    name,
    password: hashedPassword,
    email,
    description,
    isSeller,
    isActive: true,
    dob,
    phone,
    cpf,
    address: addressAlreadyExists ? addressAlreadyExists : newAddress!,
  });
  await userRepo.save(user);

  return user;
};
