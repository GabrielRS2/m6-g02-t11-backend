export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  dob: string;
  description: string;
  isSeller: boolean;
  cep: string;
  state: string;
  city: string;
  street: string;
  number: string;
  complement?: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  cpf?: string;
  phone?: string;
  dob?: string;
  description?: string;
  isSeller?: boolean;
  isActive?: boolean;
  cep?: string;
  state?: string;
  city?: string;
  street?: string;
  number?: string;
  complement?: string;
}
