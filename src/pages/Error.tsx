import React from "react";
import { useRouteError } from "react-router-dom";

export const Error = () => {
    const error: any = useRouteError();
    
    return (
        <div className="container h-screen min-w-full">
            <div className="flex flex-col items-center justify-center h-full gap-5">
                <h1 className="text-3xl">Ooops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p className="text-gray-500">
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>
        </div>
    )
}