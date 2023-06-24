export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  age: number;
  password: string;
  products: string[];
}

export type CategoryProduct =
  | "electronics"
  | "jewelery"
  | "men's clothing"
  | "women's clothing";

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: CategoryProduct;
}

export interface UserLogin {
  userName: string;
  password: string;
};