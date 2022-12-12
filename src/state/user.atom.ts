import { atom, selector } from "recoil";
import { User } from "../types/user";

const init: User = {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    address: 'xxxxxxx',
    cart: []
}

export const userState = atom({
    key: 'user',
    default: init
})