import { Product } from "./product";

export type User = {
    id: number;
    name: string;
    email: string;
    address: string;
    cart: Product[]
}