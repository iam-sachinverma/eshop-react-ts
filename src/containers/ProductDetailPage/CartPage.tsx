import React, { useMemo } from "react";
import { NoSymbolIcon, CheckIcon } from "@heroicons/react/24/outline";
import Prices from "components/Prices";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { removeProduct, decreaseProduct, addProductToCart } from "app/cartSlice";

import EmptyCartPage from "./EmptyCartPage";

const MAX_SHIPPING = 499;

const CartPage = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart);
  const quantitySelected = 1;
    
  const renderStatusSoldout = () => {
    return (
      <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <NoSymbolIcon className="w-3.5 h-3.5" />
        <span className="ml-1 leading-none">Sold Out</span>
      </div>
    );
  };

  const renderStatusInstock = () => {
    return (
      <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <CheckIcon className="w-3.5 h-3.5" />
        <span className="ml-1 leading-none">In Stock</span>
      </div>
    );
  };

  const renderProduct = (item: any, index: number) => {
    const { image, price, name } = item;
      
      return (
        <div
          key={index}
          className="relative flex py-8 sm:py-10 xl:py-12 first:pt-0 last:pb-0"
        >
          <div className="relative h-36 w-24 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
            
            { item?.variantID === 0 ? (  
              <img
              src={item?.images?.[0]?.src}
              alt={item?.name}
              className="h-full w-full object-fit object-center"
            />
            ) : (
              <img
              src={item?.image?.src}
              alt={item?.name}
              className="h-full w-full object-fit object-center"
            />
            )} 
            
            <Link to={`/product/${item?.id}`} className="absolute inset-0"></Link>
          </div>
  
          <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between ">
                <div className="flex-[1.5] ">
                  <h3 className="text-base font-semibold">
                    <Link to={`/product/${item?.id}`}>{item?.name}</Link>
                  </h3>


                  {/* Attributes */}
                  { item.attributes.length > 0 && (

                
                    <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
                      
                      { item.attributes.map((attr: any, index:number) => (
                        <div className="flex items-center space-x-1.5" key={index}>
                        
                        <span className="font-medium">{`${attr.name} :`}</span>
              
                        <span>{`${attr.option}`}</span>

                        <span className="mx-4 border-l border-slate-200 dark:border-slate-700 "></span>

                        </div>
                      )) }
                      
                  </div>
                  ) }
            

                  <div className="mt-3 flex justify-between w-full sm:hidden relative">
  
                    {/* Increment and Decrement Button Mobile */}
                    <div className={`nc-NcInputNumber flex items-center justify-between space-x-5 relative z-10`}>
                      <div
                        className={`nc-NcInputNumber__content flex items-center justify-between w-[104px] sm:w-28`}
                      >
                        <button
                          className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
                          type="button"
                          onClick={() => dispatch(decreaseProduct(item))}
                        >
                          <MinusIcon className="w-4 h-4" />
                        </button>
                        <span className="select-none block flex-1 text-center leading-none">
                          {item?.quantitySelected}
                        </span>
                        <button
                          className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
                          type="button"
                          onClick={() => dispatch(addProductToCart({...item, quantitySelected})) }
                        >
                          <PlusIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
  
                    <Prices
                      contentClass="py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium h-full"
                      price={+item?.price}
                    />
                  </div>
                </div>
  
                <div className="hidden sm:block text-center relative">
                    {/* Increment and Decrement Desktop */}
                    <div className={`nc-NcInputNumber flex items-center justify-between space-x-5 relative z-10`}>
                      <div
                        className={`nc-NcInputNumber__content flex items-center justify-between w-[104px] sm:w-28`}
                      >
                        <button
                          className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
                          type="button"
                          onClick={() => dispatch(decreaseProduct(item))}
                        >
                          <MinusIcon className="w-4 h-4" />
                        </button>
                        <span className="select-none block flex-1 text-center leading-none">
                          {item?.quantitySelected}
                        </span>
                        <button
                          className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
                          type="button"
                          onClick={() => dispatch(addProductToCart({...item, quantitySelected})) }
                        >
                          <PlusIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                </div>
  
                <div className="hidden flex-1 sm:flex justify-end">
                  <Prices price={+item?.price} className="mt-0.5" />
                </div>
              </div>
            </div>
  
            <div className="flex mt-auto pt-4 items-end justify-between text-sm">
              {item?.stock_quantity <= 0
                ? renderStatusSoldout()
                : renderStatusInstock()
              }
  
              <a
                href="##"
                className="relative z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm "
                onClick={() => dispatch(removeProduct(item))}
              >
                <span>Remove</span>
              </a>
            </div>
          </div>
        </div>
      );
  };

  return (
    <div className="nc-CartPage">
      <Helmet>
        <title>Your Shopping Cart - EcoFreaky</title>
      </Helmet>

      {
        cartItems?.products?.length === 0 ? (
          <EmptyCartPage/>
        ) : (
          <main className="container py-8 md:py-14 lg:pb-28 lg:pt-10 ">
            <div className="mb-12 sm:mb-16">
              <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-medium">
                My Cart
              </h2>
              <p className="text-sm md:text-md mt-4">{ 
                cartItems.total < MAX_SHIPPING ? 
                (`Spend  ₹${MAX_SHIPPING - cartItems.total} more to get FREE Shipping`) : 
                (`You are eligible for FREE SHIPPING!`)}
              </p>
            </div>

            {/* <hr className="border-slate-200 dark:border-slate-700 my-10 xl:my-12" /> */}

            <div className="flex flex-col lg:flex-row">
              
              <div className="w-full lg:w-[60%] xl:w-[55%] divide-y divide-slate-200 dark:divide-slate-700 ">
                {cartItems?.products?.map(renderProduct)}
              </div>

              <div className="border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:mx-16 2xl:mx-20 flex-shrink-0"></div>
              
              <div className="flex-1">
                <div className="sticky top-28">
                  <h3 className="text-lg font-semibold ">Order Summary</h3>
                  <div className="mt-7 text-sm text-slate-500 dark:text-slate-400 divide-y divide-slate-200/70 dark:divide-slate-700/80">
                    <div className="flex justify-between pb-4">
                      <span>Subtotal</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-200">
                        ₹ {cartItems?.total}
                      </span>
                    </div>
                    {/* <div className="flex justify-between py-4">
                      <span>Shpping estimate</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-200">
                        ₹ 0.00
                      </span>
                    </div>
                    <div className="flex justify-between py-4">
                      <span>Tax estimate</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-200">
                        ₹ {`${total_tax}`}
                      </span>
                    </div> */}
                    <div className="flex justify-between text-slate-900 dark:text-slate-200 text-base pt-4">
                      <span>Order total</span>
                      <span>₹ {cartItems?.total}</span>
                    </div>
                  </div>
                  <Link to={`/checkout`}>
                  <ButtonPrimary className="mt-8 w-full">Checkout</ButtonPrimary>
                  </Link>
                  <div className="mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center">
                    <p className="block relative pl-5">
                      <svg
                        className="w-4 h-4 absolute -left-1 top-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 8V13"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.9945 16H12.0035"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Tax Included.{` `}
                      {/* <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="##"
                        className="text-slate-900 dark:text-slate-200 underline font-medium"
                      >
                        Taxes
                      </a>
                      <span>
                        {` `}and{` `}
                      </span> */}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="##"
                        className="text-slate-900 dark:text-slate-200 underline font-medium"
                      >
                        Shipping
                      </a>
                      {` `} calculated at checkout
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </main>
        )
      }

    </div>
  );
};

export default CartPage;
