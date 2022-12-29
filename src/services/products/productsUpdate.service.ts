import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";

import { Product } from "../../entities/products.entity";
import { Photo } from "../../entities/photos.entity";

import { IProductsUpdateRequest } from "../../interfaces/products";

export const productsUpdateService = async (
  id: string,
  {
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
  }: IProductsUpdateRequest
): Promise<Product> => {
  const productsRepo = AppDataSource.getRepository(Product);
  const photosRepo = AppDataSource.getRepository(Photo);

  const product = await productsRepo.findOne({ where: { id: id } });
  if (!product) {
    throw new AppError(404, "Product not found");
  }

  const oldCover = await photosRepo.findOne({
    where: { product: product, is_cover_img: true },
  });

  if (coverPhoto && oldCover) {
    await photosRepo.delete(oldCover);
  }
  if (coverPhoto) {
    const newCover = photosRepo.create({
      content: coverPhoto,
      is_cover_img: true,
      product: product,
    });
    await photosRepo.save(newCover);
    console.log(newCover);
  }

  const oldPhotos = await photosRepo.find({
    where: {
      product: product,
      is_cover_img: false,
    },
  });
  if (photos && oldPhotos) {
    await photosRepo.remove(oldPhotos);
  }
  if (photos) {
    const newPhotos: Photo[] = [];
    photos.forEach((photo) => {
      const newPhoto = photosRepo.create({
        content: photo,
        product: product,
      });
      newPhotos.push(newPhoto);
    });
    await photosRepo.save(newPhotos);
  }

  product.model = model ? model : product.model;
  product.description = description ? description : product.description;
  product.km = km ? km : product.km;
  product.year = year ? year : product.year;
  product.saleType = saleType ? saleType : product.saleType;
  product.vehicleType = vehicleType ? vehicleType : product.vehicleType;
  product.price = price ? price : product.price;
  product.isActive = isActive ? isActive : product.isActive;

  await productsRepo.save(product);

  const updatedProduct = await productsRepo.find({
    relations: {
      photos: true,
    },
    where: {
      id: id,
    },
  });

  return updatedProduct[0];
};
