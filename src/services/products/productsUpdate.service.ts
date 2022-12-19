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
  const newPhotosArray = [];

  const product = await productsRepo.findOne({ where: { id: id } });
  if (!product) {
    throw new AppError(404, "product not found");
  }

  const oldCover = await photosRepo.findOne({ where: { product: product } });
  if (!oldCover) {
    throw new AppError(404, "Cover photo not found");
  }

  const oldPhotos = await photosRepo.find({
    where: {
      product: product,
      is_cover_img: false,
    },
  });

  if (coverPhoto) {
    const newCover = photosRepo.create({
      id: oldCover.id,
      content: coverPhoto,
    });

    await photosRepo.update(oldCover.id, newCover);
    newPhotosArray.push(newCover);

    if (!photos && oldPhotos) {
      newPhotosArray.concat(oldPhotos);
    }
  }

  if (photos) {
    await photosRepo.remove(oldPhotos);

    photos.forEach((photo) => {
      const newPhoto = photosRepo.create({
        content: photo,
      });
      newPhotosArray.push(newPhoto);
    });
    if (!coverPhoto) {
      newPhotosArray.unshift(oldCover);
    }
  }

  await photosRepo.save(newPhotosArray);

  const newProductData = productsRepo.create({
    id: product.id,
    model: model ? model : product.model,
    description: description ? description : product.description,
    km: km ? km : product.km,
    year: year ? year : product.year,
    saleType: saleType ? saleType : product.saleType,
    vehicleType: vehicleType ? vehicleType : product.vehicleType,
    price: price ? price : product.price,
    isActive: isActive ? isActive : product.isActive,
    photos: newPhotosArray,
  });

  await productsRepo.save(newProductData);
  console.log(product);
  const productUpdated = await productsRepo.findOneBy({ id });

  return productUpdated!;
};
