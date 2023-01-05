import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";

import { Product } from "../../entities/products.entity";
import { Photo } from "../../entities/photos.entity";

import { IProductsCreateRequest } from "../../interfaces/products";
import { User } from "../../entities/user.entity";
import { instanceToPlain } from "class-transformer";

export const productsCreateService = async ({
  model,
  description,
  km,
  year,
  saleType,
  vehicleType,
  price,
  isActive,
  coverPhoto,
  photos,
  userId,
}: IProductsCreateRequest): Promise<Product> => {
  const productsRepo = AppDataSource.getRepository(Product);
  const photosRepo = AppDataSource.getRepository(Photo);
  const userRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOneBy({ id: userId });
  if (!user) {
    throw new AppError(404, "User not found <token>");
  }

  const advertPhoto = photosRepo.create({
    content: coverPhoto,
    is_cover_img: true,
  });

  const allPhotos = [advertPhoto];

  if (photos) {
    photos.forEach((photo) => {
      const newPhoto = photosRepo.create({
        content: photo,
      });
      allPhotos.push(newPhoto);
    });
  }

  const newProduct = productsRepo.create({
    model,
    description,
    km,
    year,
    saleType,
    vehicleType,
    price,
    isActive,
    photos: allPhotos,
  });
  newProduct.user = user;

  const productAlreadyExists = await productsRepo.findOne({
    where: {
      model,
      description,
      km,
      year,
      saleType,
      vehicleType,
      price,
      isActive,
    },
  });
  if (productAlreadyExists) {
    throw new AppError(409, "This product is already listed");
  }

  await photosRepo.save(allPhotos);
  await productsRepo.save(newProduct);

  return newProduct;
};
