import { Photo } from "../../entities/photos.entity";

export interface IProduct {
  model: string;
  description: string;
  km: number;
  year: string;
  saleType: string;
  vehicleType: string;
  price: number;
  isActive: boolean;
  coverPhoto: Photo;
  photos?: Photo[];
}

export interface IProductsCreateRequest {
  model: string;
  description: string;
  km: number;
  year: string;
  saleType: string;
  vehicleType: string;
  price: number;
  isActive?: boolean;
  coverPhoto: string;
  photos?: string[];
  userId?: string;
}

export interface IProductsUpdateRequest {
  model?: string;
  description?: string;
  km?: number;
  year?: string;
  saleType?: string;
  vehicleType?: string;
  price?: number;
  isActive?: boolean;
  coverPhoto?: string;
  photos?: string[];
}
