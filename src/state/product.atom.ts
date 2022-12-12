import { atom, selector } from "recoil";
import { Product } from "../types/product";

const init: Product[] = [
    {
        id: 1,
        name: 'Product1 abc',
        price: 19.99,
        quantity: 3,
        image: 'product1.jpeg'
    },
    {
        id: 2,
        name: 'Product2 camera',
        price: 9.99,
        quantity: 10,
        image: 'product2.jpeg'
    },
    {
        id: 3,
        name: 'Product3 expensive',
        price: 99.99,
        quantity: 10,
        image: 'product3.jpeg'
    },
] 

export const productsState = atom<Product[]>({
    key: 'products',
    default: init
});

export const productFilterState = atom<string>({
    key: 'productFilter',
    default: ""
});

export const filteredProductsState = selector({
    key: 'filteredProductsState',
    get: ({ get }) => {
        const products = get(productsState);
        const filter = get(productFilterState);

        return products.filter((product) => product.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0);
    }
});