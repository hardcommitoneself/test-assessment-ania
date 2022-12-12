import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { filteredProductsState, productFilterState } from "../state/product.atom";
import { userState } from "../state/user.atom";
import { IoCartOutline } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";

export const Home = () => {
    const products = useRecoilValue(filteredProductsState);
    const user = useRecoilValue(userState);
    const [filter, setFilter] = useRecoilState(productFilterState);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);    
    }

    return (
        <div className="container relative h-screen min-w-full">
            {/* top banner */}
            <div className="relative flex">
                {/* banner */}
                <div className="relative w-full">
                    <img src="/images/bg.jpg" className="w-full h-[500px] object-cover" alt="banner" />

                    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
                        <h1 className="text-6xl font-bold text-sky-500">Jurassic Store</h1>
                    </div>

                    {/* cart icon */}
                    <div className="absolute top-0 right-0">
                        <div className="flex items-center gap-5 p-5 cursor-pointer">
                            <span className="text-white">Welcome <i>{user.name}</i></span>
                            <IoCartOutline size={30} className="font-black text-sky-500" />
                        </div>
                    </div>

                    {/* hamburger menu */}
                    <div className="absolute top-0 right-0 z-20 flex h-screen w-80 bg-white/90">
                        <div className="flex flex-col w-full gap-4 py-4 px-7">
                            <h1 className="text-3xl">Cart</h1>

                            {/* cart list */}
                            <div className="flex flex-col gap-3">
                                {/* product list */}
                                {user.cart.map((product, index) => (
                                    <div className="flex justify-between" key={index}>
                                        <div className="flex gap-2">
                                            <img src="/images/product1.jpeg" alt="cart1" className="object-contain w-14 h-14" />
                                            <div className="flex flex-col justify-between gap-2">
                                                <h1 className="text-lg font-semibold">Product1</h1>
                                                <div className="flex justify-between text-sm">
                                                    <span>Qty: 1</span>
                                                    <span>$19.99</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* delete button */}
                                        <div className="flex items-center">
                                            <button className="flex items-center px-2 py-2 text-xs font-medium leading-tight text-white uppercase transition duration-150 ease-in-out rounded shadow-md bg-sky-600 hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg">
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
                                <span className="text-sm">Total: $19.99</span>
                                <button className="px-6 py-2.5 w-fit bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out flex items-center">
                                    Check Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* overlay */}
            <div className="absolute top-0 left-0 z-10 w-full h-full bg-black/30">

            </div>

            {/* products */}
            <div className="flex flex-col items-center gap-5 px-20 py-10">
                {/* title */}
                <h1 className="text-3xl font-medium">Browse the Catalogue</h1>

                {/* input */}
                <div className="relative flex items-stretch w-full gap-2 input-group">
                    <input type="search" value={filter} onChange={handleFilterChange} className="form-control relative flex flex-auto min-w-0 w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-sky-600 focus:outline-none" placeholder="Search for products..." aria-label="Search" aria-describedby="button-addon2" />
                </div>

                {/* product list */}
                <div className="grid w-full sm:grid-cols-2 lg:grid-cols-4 sm:gap-3 lg:gap-7">
                    {products.map((product, index) => (
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
                                    <button className="px-6 py-2.5 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out flex items-center">
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