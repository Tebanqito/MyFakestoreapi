export interface User {
  id: string;
  name: string;
  age: number;
  description: string;
  image: string;
};

type CategoryProduct =
  | "electronics"
  | "jewelery"
  | "men's clothing"
  | "women's clothing";

export interface Product {
  id: string;
  title: string;
  price: number;
  category: CategoryProduct;
  description: string;
  image: string;
};