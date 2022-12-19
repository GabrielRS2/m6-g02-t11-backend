import { Product } from "../../entities/products.entity";

export interface IPhoto {
    id: string;
    content: string;
    is_cover_img: boolean;
    product: Product;
  }