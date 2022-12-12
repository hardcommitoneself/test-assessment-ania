import React from "react";
import { useRecoilValue } from "recoil";
import { filteredProductsState } from "../state/product.atom";
import { IoCartOutline } from "react-icons/io5";

export const Home = () => {
    const products = useRecoilValue(filteredProductsState);

    return (
        <div className="container h-screen min-w-full">
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
                        <div className="flex p-5 cursor-pointer">
                            <IoCartOutline size={30} className="font-black text-sky-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* products */}
            <div className="flex flex-col items-center gap-5 px-20 py-10">
                {/* title */}
                <h1 className="text-3xl font-medium">Browse the Catalogue</h1>

                {/* input */}
                <div className="relative flex items-stretch w-full gap-2 input-group">
                    <input type="search" className="form-control relative flex flex-auto min-w-0 w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-sky-600 focus:outline-none" placeholder="Search for products..." aria-label="Search" aria-describedby="button-addon2" />
                    <button className="px-6 py-2.5 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                        </svg>
                    </button>
                </div>

                {/* product list */}
                <div className="grid w-full sm:grid-cols-2 lg:grid-cols-4 sm:gap-3 lg:gap-7">
                    {products.map((product, index) => (
                        <div className="flex flex-col gap-2" key={index}>
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