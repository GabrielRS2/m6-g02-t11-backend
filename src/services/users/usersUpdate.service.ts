import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { hash } from "bcryptjs";

import { IUserUpdate } from "../../interfaces/users";
import { User } from "../../entities/user.entity";
import { Address } from "../../entities/address.entity";

export const userUpdateService = async (
  id: string,
  {
    name,
    password,
    email,
    description,
    isSeller,
    isActive,
    dob,
    phone,
    cpf,
    cep,
    city,
    state,
    street,
    number,
    complement,
  }: IUserUpdate
): Promise<User> => {
  const userRepo = AppDataSource.getRepository(User);
  const userAffected = await userRepo.findOneBy({ id });
  if (!userAffected) {
    throw new AppError(404, "User not found <param> <service>");
  }

  const addressRepo = AppDataSource.getRepository(Address);

  if (email) {
    const emailAlreadyExists = await userRepo.find({
      where: { email: email },
    });
    if (emailAlreadyExists[0] && emailAlreadyExists[0].id != id) {
      throw new AppError(
        401,
        "Invalid Email <delete me after develpment!!! another user already has this email>"
      );
    }
  }

  if (cpf) {
    const cpfAlreadyExists = await userRepo.find({
      where: { cpf: cpf },
    });
    if (cpfAlreadyExists[0] && cpfAlreadyExists[0].id != id) {
      throw new AppError(
        401,
        "Invalid cpf <delete me after develpment!!! another user already has this cpf>"
      );
    }
  }

  const addressAlreadyExists = await addressRepo.find({
    where: {
      cep: cep,
      city: city,
      state: state,
      street: street,
      number: number,
      complement: complement,
    },
  });

  if (!addressAlreadyExists[0]) {
    var newAddress = addressRepo.create({
      cep,
      city,
      state,
      street,
      number,
      complement,
    });
    await addressRepo.save(newAddress);
  } else {
    var newAddress = addressAlreadyExists[0];
    cep ? (newAddress.cep = cep) : null;
    city ? (newAddress.city = city) : null;
    state ? (newAddress.state = state) : null;
    street ? (newAddress.street = street) : null;
    number ? (newAddress.number = number) : null;
    complement ? (newAddress.complement = complement) : null;
    await addressRepo.save(newAddress);
  }

  if (password) {
    const hashedPassword = await hash(password, 10);
    userAffected.password = hashedPassword;
  }

  name ? (userAffected.name = name) : null;
  email ? (userAffected.email = email) : null;
  description ? (userAffected.description = description) : null;
  dob ? (userAffected.dob = dob) : null;
  phone ? (userAffected.phone = phone) : null;
  cpf ? (userAffected.cpf = cpf) : null;
  isActive ? (userAffected.isActive = isActive) : null;
  isSeller ? (userAffected.isSeller = isSeller) : null;
  userAffected.address = newAddress!;

  await userRepo.save(userAffected);

  return userAffected;
};
