import React, { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../state/user.atom";
import {
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { StripeCardElementChangeEvent, StripeCardElement } from "@stripe/stripe-js";
import axios from "axios";

interface CheckoutFormProps {
    name: string;
    email: string;
    address: string;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ name, email, address }) => {
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState('');
    const [succeed, setSucceeded] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const stripe = useStripe();
    const elements = useElements();
    const [user, setUser] = useRecoilState(userState);

    const handleChange = async (e: StripeCardElementChangeEvent) => {
        setError(e.error ? e.error.message : "");
        setDisabled(e.empty);
    }

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setProcessing(true);

        if(!elements || !name || !email || !address) {
            alert("Please check user information or something went wrong! Please try again!");
            return;
        }

        const payload = await stripe?.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement) as StripeCardElement,
                billing_details: {
                    name: name,
                    email: email,
                    address: {
                        city: address
                    }
                }
            },
        });

        if(payload?.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            // succeeded
            setError('');
            setProcessing(false);
            setSucceeded(true);

            // remote all products from cart
            setUser({
                ...user,
                cart: []
            });
        }
    }, [address, clientSecret, elements, email, name, setUser, stripe, user])

    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const response = await axios.post('http://localhost:4242/create-payment-intent', {items: user.cart});
                // setClientSecret(response)
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                setError('upexprected error occured!');
            }
        }

        fetchClientSecret();
    }, [user])

    return (
        <form id="payment-form" className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <CardElement id="card-element" onChange={handleChange} />
            {
                error && (
                    <div className="text-sm text-red-500">{error}</div>
                )
            }
            <button 
                type="submit" 
                disabled={processing || disabled || succeed} 
                className={`px-6 py-2.5 justify-center ${(disabled || processing || succeed) ? 'bg-sky-400 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg'} text-white font-medium text-xs leading-tight uppercase rounded shadow-md transition duration-150 ease-in-out flex items-center`}
            >
                {
                    processing ? (
                        <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </div>
                    ) : (
                        <span>Check Out</span>
                    )
                }
            </button>
            {
                succeed && (
                    <div className="text-sm text-green-500">Payment succeeded!</div>
                )
            }
        </form>
    )
}