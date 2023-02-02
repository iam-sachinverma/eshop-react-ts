import React from "react";
import { Helmet } from "react-helmet";
import NcImage from "shared/NcImage/NcImage";
import I404Png from "images/404.png";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import emptyCart from "images/empty.png"

const EmptyCartPage = () => {
    return (
        <div className="nc-EmptyCartPage">
            <div className="container my-6 relative pt-5 pb-12 lg:pb-20 lg:pt-5">
                {/* HEADER */}
                <header className="grid place-items-center gap-6 place-content-center justify-center text-center max-w-2xl mx-auto space-y-2">
                    <div className="w-52 h-52 item-center">
                     <NcImage src={emptyCart} />
                    </div>
                    <span className="block text-xl text-neutral-800 dark:text-neutral-200 tracking-wider font-medium">
                     Your EcoFreaky Cart is empty.{" "}
                    </span>
                    <span className="text-sm">Spend ₹1,500 more to get FREE Shipping</span>
                    <div className="pt-6">
                     <ButtonPrimary href="/" className="mx-2">Shop Eco-Friendly Products</ButtonPrimary>
                    </div>
                </header>
            </div>
        </div>
    )
}

export default EmptyCartPage;