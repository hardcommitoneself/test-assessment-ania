import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState, cartState } from "../state/user.atom";
import { CheckoutForm } from "../components/CheckoutForm";
import { AiFillHome } from "react-icons/ai";

const stripePromise = loadStripe('pk_test_51ME4ooG5GHjXDN1Vj0dmDkxw1XrOvADLZb8vBkQZIy9W7pEltc5vXFTMvve9ddJhSzdGR5h8tWqB77GPkdupdzPi00CcPmab9Q');

export const Checkout = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const user = useRecoilValue(userState);
    const { total } = useRecoilValue(cartState);
    const navigate = useNavigate();

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    }

    const handleGotoHome = () => {
        navigate('/');
    }

    return (
        <div className="container relative h-screen min-w-full">
            {/* goto home */}
            <div className="absolute top-0 right-0 p-10">
                <button onClick={handleGotoHome} className="flex items-center px-2 py-2 text-xs font-medium leading-tight text-white uppercase transition duration-150 ease-in-out rounded shadow-md bg-sky-600 hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg">
                    <AiFillHome size={15} />
                </button>
            </div>

            <div className="flex flex-col w-full gap-10 px-24 py-14">
                <h1 className="text-5xl font-black">Check Out</h1>

                <div className="flex gap-20">
                    <div className="flex flex-col w-1/2 gap-10">
                        {/* user info */}
                        <div className="flex flex-col gap-3">
                            <span>User information</span>
                            <div className="xl:w-96">
                                <input type="text" id="name" name="name" placeholder="John Doe" value={name} onChange={handleNameChange} className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
                            </div>
                            <div className="xl:w-96">
                                <input type="email" id="email" name="email" placeholder="johndoe@gmail.com" value={email} onChange={handleEmailChange} className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
                            </div>
                            <div className="xl:w-96">
                                <input type="text" id="address" name="address" placeholder="Please city name" value={address} onChange={handleAddressChange} className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
                            </div>
                        </div>

                        {/* checkout form */}
                        <Elements stripe={stripePromise}>
                            <CheckoutForm name={name} email={email} address={address} />
                        </Elements>
                    </div>

                    {/* cart */}
                    <div className="flex flex-col w-1/2 gap-4 py-4 px-7">
                            <h1 className="text-3xl">Cart</h1>

                            {/* cart list */}
                            <div className="flex flex-col gap-3">
                                {/* product list */}
                                {user.cart.map((product, index) => (
                                    <div className="flex" key={index}>
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
                            <div className="flex mt-10">
                                <span className="text-sm">Total: ${total.toFixed(2)}</span>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}