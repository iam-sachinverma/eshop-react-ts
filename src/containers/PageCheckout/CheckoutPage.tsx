import React, { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { removeProduct, decreaseProduct, addProductToCart, emptyCart } from "app/cartSlice";
import { useGetCustomerQuery } from "features/customer/customerApiSlice";
import { useCreateOrderMutation } from "features/order/orderApiSlice";
import { Link, useNavigate } from "react-router-dom";

import Label from "components/Label/Label";
import Prices from "components/Prices";
import { Helmet } from "react-helmet";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import ContactInfo from "./ContactInfo";
import PaymentMethod from "./PaymentMethod";
import ShippingAddress from "./ShippingAddress";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";


const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user:any = useAppSelector((state) => state.auth.user)
  console.log('User:', user);
  
  const { data:customer, refetch, isSuccess  } = useGetCustomerQuery(user?.user_email);
  console.log('Customer', customer);
  
  const [ createOrder ] = useCreateOrderMutation();

  const cartItems = useAppSelector((state) => state.cart);  

  const [ orderItems, setOrderItems ] = useState<any>([]);

  const createLineItems = (products: any) => {

    let arr = [...orderItems];

    products?.map((product: any) => {
      if(product?.type === 'simple'){
        
        const item = {
          product_id: product?.id,
          quantity: product?.quantitySelected,
        }
        arr.push(item)
      }else{

        const item = {
          product_id: product?.product_id,
          variation_id: product?.id,
          quantity: product?.quantitySelected,
        }
        arr.push(item)
      }
    })

    console.log(arr);
    
    return arr;
  }

  const lineItems = useMemo(() => createLineItems(cartItems?.products),[cartItems]);
  console.log(lineItems);
  
  const createOrderHandler = async () => {
    
    refetch();

    if(!isSuccess){
      return;
    }
    
    if(customer?.[0]?.billing?.address_1 === ''){
      
      toast.error('Please Enter Shipping Address',{
        duration: 4000,
        position: "bottom-center"
      })

      return

    }else if(customer?.[0]?.billing?.phone === ''){
      
      toast.error('Please Enter Contact Details',{
        duration: 4000,
        position: "bottom-center"
      })

      return

    }else{

      const orderData = {
        payment_method: "bacs",
        payment_method_title: "Direct Bank Transfer",
        set_paid: true,
        billing: {
          ...customer[0]?.billing
        },
        shipping: {
          ...customer[0]?.shipping
        },
        line_items: lineItems,
      }

      console.log('Order Data', orderData);
  
      try {
        await createOrder(orderData);
        dispatch(emptyCart());
        navigate('/');
        toast.success('Your Order has been placed successfully',{
          duration: 5000,
          position: "bottom-center"
        })
      } catch (error) {
        console.log(error);
      }
    }
  
  }

  const quantitySelected = 1;

  const [tabActive, setTabActive] = useState<
    "ContactInfo" | "ShippingAddress" | "PaymentMethod"
  >("ContactInfo");

  const handleScrollToEl = (id: string) => {
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  const renderProduct = (item: any, index: number) => {
    // const { image, price, name } = item;
  
    return (
      <div key={index} className="relative flex py-7 first:pt-0 last:pb-0">
        <div className="relative h-36 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
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
                <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
                  { item?.attributes?.length === 0 ? "" :
                  
                  (
                    <div className="flex items-center space-x-1.5">
                    {/* <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M7.01 18.0001L3 13.9901C1.66 12.6501 1.66 11.32 3 9.98004L9.68 3.30005L17.03 10.6501C17.4 11.0201 17.4 11.6201 17.03 11.9901L11.01 18.0101C9.69 19.3301 8.35 19.3301 7.01 18.0001Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.35 1.94995L9.69 3.28992"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.07 11.92L17.19 11.26"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 22H16"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.85 15C18.85 15 17 17.01 17 18.24C17 19.26 17.83 20.09 18.85 20.09C19.87 20.09 20.7 19.26 20.7 18.24C20.7 17.01 18.85 15 18.85 15Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg> */}
                    <span>{item?.attributes?.[0].name}</span>
                    :
                    <span>{item?.attributes?.[0].option}</span>
                  </div>
                  ) 
                  
                  }
                  
                  {/* <span className="mx-4 border-l border-slate-200 dark:border-slate-700 "></span> */}
                  {/* <div className="flex items-center space-x-1.5">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M21 9V3H15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 15V21H9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21 3L13.5 10.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.5 13.5L3 21"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span>{`2XL`}</span>
                  </div> */}

                </div>

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

              <div className="hidden flex-1 sm:flex justify-end">
                <Prices price={+item?.price} className="mt-0.5" />
              </div>
            </div>
          </div>

          <div className="flex mt-auto pt-4 items-end justify-between text-sm">
            <div className="hidden sm:block text-center relative">

              {/* Increment and Decrement Button Desktop */}
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

  const renderLeft = () => {
    return (
      <div className="space-y-8">
        <div id="ContactInfo" className="scroll-mt-24">

          <ContactInfo
            isMail={isSuccess && customer[0]?.email}
            customerID={isSuccess && customer[0]?.id}
            isActive={tabActive === "ContactInfo"}
            onOpenActive={() => {
              setTabActive("ContactInfo");
              handleScrollToEl("ContactInfo");
            }}
            onCloseActive={() => {
              setTabActive("ShippingAddress");
              handleScrollToEl("ShippingAddress");
            }}
          />

        </div>

        <div id="ShippingAddress" className="scroll-mt-24">
          <ShippingAddress
            customerID={isSuccess && customer[0]?.id}
            isMail={isSuccess && customer[0]?.email}
            isActive={tabActive === "ShippingAddress"}
            onOpenActive={() => {
              setTabActive("ShippingAddress");
              handleScrollToEl("ShippingAddress");
            }}
            onCloseActive={() => {
              setTabActive("PaymentMethod");
              handleScrollToEl("PaymentMethod");
            }}
          />
        </div>

        <div id="PaymentMethod" className="scroll-mt-24">
          <PaymentMethod
            isActive={tabActive === "PaymentMethod"}
            onOpenActive={() => {
              setTabActive("PaymentMethod");
              handleScrollToEl("PaymentMethod");
            }}
            onCloseActive={() => setTabActive("PaymentMethod")}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="nc-CheckoutPage">
      <Helmet>
        <title>Checkout || EcoFreaky</title>
      </Helmet>

      <main className="container py-16 lg:pb-28 lg:pt-20 ">
        <div className="mb-16">
          <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
            Checkout
          </h2>
          {/* <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
            <Link to={"/#"} className="">
              Homepage
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <Link to={"/#"} className="">
              Clothing Categories
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <span className="underline">Checkout</span>
          </div> */}
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="flex-1">{renderLeft()}</div>

          <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16 "></div>

          <div className="w-full lg:w-[36%] ">
            <h3 className="text-lg font-semibold">Order summary</h3>
            <div className="mt-8 divide-y divide-slate-200/70 dark:divide-slate-700 ">
              {cartItems?.products?.map(renderProduct)}
            </div>

            <div className="mt-10 pt-6 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200/70 dark:border-slate-700 ">
              <div>
                <Label className="text-sm">Discount code</Label>
                <div className="flex mt-1.5">
                  <Input sizeClass="h-10 px-4 py-3" className="flex-1" />
                  <button className="text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 rounded-2xl px-4 ml-3 font-medium text-sm bg-neutral-200/70 dark:bg-neutral-700 dark:hover:bg-neutral-800 w-24 flex justify-center items-center transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <div className="mt-4 flex justify-between py-2.5">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">
                 ₹ {cartItems?.total}
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span>Shipping estimate</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">
                  ₹ 0.00
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span>Tax estimate</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">
                 ₹ 0.00
                </span>
              </div>
              <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                <span>Order total</span>
                <span>₹ {cartItems?.total}</span>
              </div>
            </div>
            <ButtonPrimary className="mt-8 w-full" onClick={() => createOrderHandler()}>Confirm order</ButtonPrimary>
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
                Learn more{` `}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="##"
                  className="text-slate-900 dark:text-slate-200 underline font-medium"
                >
                  Taxes
                </a>
                <span>
                  {` `}and{` `}
                </span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="##"
                  className="text-slate-900 dark:text-slate-200 underline font-medium"
                >
                  Shipping
                </a>
                {` `} infomation
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
