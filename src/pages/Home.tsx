import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { filteredProductsState, productFilterState, productsState } from "../state/product.atom";
import { userState, cartState } from "../state/user.atom";
import { IoCartOutline } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { Product } from "../types/product";

export const Home = () => {
    const [allProducts, setAllProducts] = useRecoilState(productsState)
    const [user, setUser] = useRecoilState(userState);
    const [filter, setFilter] = useRecoilState(productFilterState);
    const [isShow, setIsShow] = useState(false);
    const filteredProducts = useRecoilValue(filteredProductsState);
    const { total } = useRecoilValue(cartState);
    const navigate = useNavigate();

    const handleShowSidebarMenu = () => {
        setIsShow(true);
    }

    const handleHideSidebarMenu = () => {
        setIsShow(false);
    }

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);    
    }

    const handleAddToCart = (product_id: number) => {
        const product = allProducts.find((product) => product.id === product_id);
        if(product && product.quantity > 0) {
            const index = allProducts.findIndex((product) => product.id === product_id);

            // reduce 1 item from the product list
            setAllProducts([
                ...allProducts.slice(0, index),
                {
                    ...product,
                    quantity: product.quantity - 1
                },
                ...allProducts.slice(index + 1)
            ]);

            // add 1 item to cart
            let updatedCart: Product[] = [];
            const cartProduct = user.cart.find((product) => product.id === product_id);
            // if same product exist in cart, increase the quantity of the product in cart
            if(cartProduct) {
                const index = user.cart.findIndex((product) => product.id === product_id);
                updatedCart = [
                    ...user.cart.slice(0, index),
                    {
                        ...cartProduct,
                        quantity: cartProduct.quantity + 1
                    },
                    ...user.cart.slice(index + 1)
                ]
            } else {
                // if not exist, add the product to cart
                updatedCart = [
                    ...user.cart,
                    {
                        ...product,
                        quantity: 1
                    }
                ]
            }

            setUser({
                ...user,
                cart: updatedCart
            })
        } else {
            alert('Not enough products');
        }
    }

    const gotoCheckout = () => {
        navigate('/checkout');
    }

    const handleRemoveFromCart = (product_id: number) => {
        const cartProduct = user.cart.find((product) => product.id === product_id);
        const product = allProducts.find((product) => product.id === product_id);

        if(cartProduct && product) {
            const cartIndex = user.cart.findIndex((product) => product.id === product_id);
            const productIndex = allProducts.findIndex((product) => product.id === product_id); 

            // remove the product from cart
            setUser({
                ...user,
                cart: [
                    ...user.cart.slice(0, cartIndex),
                    ...user.cart.slice(cartIndex + 1)
                ]
            });

            // add items to product list again
            setAllProducts([
                ...allProducts.slice(0, productIndex),
                {
                    ...product,
                    quantity: product.quantity + cartProduct.quantity
                },
                ...allProducts.slice(productIndex + 1)
            ]);
        } else {
            alert('something went wrong!');
        }
    }

    return (
        <div className="container relative h-screen min-w-full overflow-x-hidden">
            {/* top banner */}
            <div className="relative flex">
                {/* banner */}
                <div className="relative w-full">
                    <img src="/images/bg.jpg" className="w-full h-[500px] object-cover" alt="banner" />

                    {/* overlay */}
                    <div className="absolute top-0 left-0 w-full bg-gradient-to-b h-1/2 from-black/20 to-transparent">

                    </div>

                    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
                        <h1 className="text-4xl font-bold text-center lg:text-6xl text-sky-500">Jurassic Store</h1>
                    </div>

                    {/* cart icon */}
                    <div className="absolute top-0 right-0" onClick={handleShowSidebarMenu}>
                        <div className="flex items-center gap-5 p-5 cursor-pointer">
                            <span className="text-white">Welcome <i className="font-bold">{user.name}</i></span>
                            <IoCartOutline size={30} className="font-black text-sky-500" />
                        </div>
                    </div>

                    {/* hamburger menu */}
                    <div className={`absolute top-0 right-0 z-20 flex h-screen w-80 bg-white/90 transition ${isShow ? 'translte-x-0' : 'translate-x-full'}`}>
                        <div className="flex flex-col w-full gap-4 py-4 px-7">
                            <h1 className="text-3xl">Cart</h1>

                            {/* cart list */}
                            <div className="flex flex-col gap-3">
                                {/* product list */}
                                {user.cart.map((product, index) => (
                                    <div className="flex justify-between" key={index}>
                                        <div className="flex gap-2">
                                            <img src={`/images/${product.image}`} alt="cart1" className="object-cover w-14 h-14" />
                                            <div className="flex flex-col justify-between gap-2">
                                                <h1 className="text-lg font-semibold truncate max-w-[140px]">{product.name}</h1>
                                                <div className="flex gap-3 text-sm">
                                                    <span>Qty: {product.quantity}</span>
                                                    <span>${product.price}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* delete button */}
                                        <div className="flex items-center">
                                            <button onClick={() => handleRemoveFromCart(product.id)} className="flex items-center px-2 py-2 text-xs font-medium leading-tight text-white uppercase transition duration-150 ease-in-out rounded shadow-md bg-sky-600 hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg">
                                                <AiFillDelete size={15} />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {/* if empty */}
                                {
                                    user.cart.length === 0 && (
                                        <i className="text-center text-gray-500">No items</i>
                                    )
                                }
                            </div>

                            {/* action */}
                            <div className="flex flex-col gap-2 mt-10">
                                <span className="text-sm">Total: ${total.toFixed(2)}</span>
                                <button onClick={gotoCheckout} className="px-6 py-2.5 w-fit bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out flex items-center">
                                    Check Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* overlay */}
            <div className={`absolute top-0 left-0 w-full h-full bg-black/30 ${isShow ? 'z-10 block' : '-z-10 hidden'}`} onClick={handleHideSidebarMenu}>
            </div>

            {/* products */}
            <div className="flex flex-col items-center gap-5 px-5 py-5 lg:px-20 lg:py-10">
                {/* title */}
                <h1 className="text-3xl font-medium">Browse the Catalogue</h1>

                {/* input */}
                <div className="relative flex items-stretch w-full gap-2 input-group">
                    <input type="search" value={filter} onChange={handleFilterChange} className="form-control relative flex flex-auto min-w-0 w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-sky-600 focus:outline-none" placeholder="Search for products..." aria-label="Search" aria-describedby="button-addon2" />
                </div>

                {/* product list */}
                <div className="grid w-full gap-2 sm:grid-cols-2 lg:grid-cols-4 sm:gap-3 lg:gap-7">
                    {filteredProducts.map((product, index) => (
                        <div className="flex flex-col gap-5" key={index}>
                            {/* item image */}
                            <img src={`/images/${product.image}`} className="h-[150px] object-cover" alt={product.name} />

                            {/* item info */}
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <h1 className="text-xl font-semibold">{product.name}</h1>
                                    <span className="text-sm">{product.quantity}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>${product.price}</span>
                                    <button  onClick={() => handleAddToCart(product.id)} className="px-6 py-2.5 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out flex items-center">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}