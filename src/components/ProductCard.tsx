import React, { FC } from "react";
import { Link } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";
import Prices from "./Prices";
import { StarIcon } from "@heroicons/react/24/solid";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import BagIcon from "./BagIcon";
import IconDiscount from "./IconDiscount";
import {
  NoSymbolIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export interface ProductCardProps {
  className?: string;
  // data?: Product;
  data?: any;
  isLiked?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  className = "",
  data,
  isLiked,
}) => {
  
  const {
    id,
    name,
    price,
  } = data;  

  const renderStatus = () => {
    if (!data) {
      return null;
    }
    const CLASSES = `nc-shadow-lg rounded-full flex items-center justify-center absolute top-3 left-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300`;
    if (data?.featured === true) {
      return (
        <div className={CLASSES}>
          <SparklesIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">Best Seller</span>
        </div>
      );
    }
    if (data?.on_sale === true) {
      return (
        <div className={CLASSES}>
          <IconDiscount className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">On Sale</span>
        </div>
      );
    }
    if (data?.stock_status === 'outstock') {
      return (
        <div className={CLASSES}>
          <NoSymbolIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">Sold Out</span>
        </div>
      );
    }
    // if (status === "limited edition") {
    //   return (
    //     <div className={CLASSES}>
    //       <ClockIcon className="w-3.5 h-3.5" />
    //       <span className="ml-1 leading-none">{status}</span>
    //     </div>
    //   );
    // }
    return null;
  };

  const renderGroupButtons = () => {
    return (
      <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <a href={`product/${id}`}>
          <ButtonPrimary
            className="shadow-lg"
            fontSize="text-xs"
            sizeClass="py-2 px-4"
          >
            <BagIcon className="w-3.5 h-3.5 mb-0.5" />
            <span className="ml-1">View Product</span>
          </ButtonPrimary>
        </a>
      </div>
    );
  };


  return (
    <>
      <div
        className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
        data-nc-id="ProductCard"
      >
        <Link to={`/product/${id}`} className="absolute inset-0"></Link>

        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
          <Link to={`/product/${id}`} className="block">
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
              src={data?.images?.[0]?.src}
              className="object-cover w-full h-full drop-shadow-xl"
            />
          </Link>

          { renderStatus() }

          { renderGroupButtons() }
        </div>  

        <div className="space-y-4 px-2.5 pt-5 pb-2.5">

          <div>
            <h2
              className={`nc-ProductCard__title text-base font-semibold transition-colors`}
            >
              {name}
            </h2>
            {/* <p className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `} 
            dangerouslySetInnerHTML={{__html: short_description}}>
            </p> */}
          </div>

          <div className="flex justify-between items-end ">
            <Prices price={+price} />
            <div className="flex items-center mb-0.5">
              <StarIcon className="w-5 h-5 pb-[1px] text-amber-400" />
              <span className="text-sm ml-1 text-slate-500 dark:text-slate-400">
                {(Math.random() * 1 + 4).toFixed(1)} (
                {Math.floor(Math.random() * 70 + 20)} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
