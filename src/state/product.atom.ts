import { atom, selector } from "recoil";
import { faker } from '@faker-js/faker';
import { Product } from "../types/product";

const generateFakeProduct = (): Product => {
    const fakeProduct: Product = {
        id: faker.datatype.uuid(),
        name: faker.animal.cat(),
        price: parseFloat(faker.commerce.price()),
        quantity: faker.datatype.number(100),
        image: faker.image.cats(600, 600, true)
    };

    return fakeProduct;
}

const init: Product[] = [
    generateFakeProduct(),
    generateFakeProduct(),
    generateFakeProduct(),
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