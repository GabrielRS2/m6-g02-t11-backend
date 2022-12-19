export interface IProductsCreate {
  model: string;
  description: string;
  km: number;
  year: string;
  saleType: string;
  vehicleType: string;
  price: number;
  isActive: boolean;
}
