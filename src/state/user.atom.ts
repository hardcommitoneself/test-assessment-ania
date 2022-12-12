import { atom, selector } from "recoil";
import { User } from "../types/user";

const init: User = {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    address: 'xxxxxxx',
    cart: []
}

export const userState = atom<User>({
    key: 'user',
    default: init
});

export const cartState = selector({
    key: 'cartState',
    get: ({ get }) => {
        const user = get(userState);

        const total = user.cart.reduce((a, c) => a + c.price * c.quantity, 0);

        return {
            total
        }
    }
})