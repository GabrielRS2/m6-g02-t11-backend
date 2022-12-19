import { Photo } from "../../entities/products.entity";

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

export interface IProductsCreate {
  model: string;
  description: string;
  km: number;
  year: string;
  saleType: string;
  vehicleType: string;
  price: number;
  isActive: boolean;
  coverPhoto: string;
  photos?: string[];
}

export interface IProductsUpdate {
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