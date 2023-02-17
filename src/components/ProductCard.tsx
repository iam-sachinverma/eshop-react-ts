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

    return null;
  };

  const renderGroupButtons = () => {
    return (
      <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <Link to={`/product/${id}`}>
          <ButtonPrimary
            className="shadow-lg"
            fontSize="text-xs"
            sizeClass="py-2 px-4"
          >
            <BagIcon className="w-3.5 h-3.5 mb-0.5" />
            <span className="ml-1">View Product</span>
          </ButtonPrimary>
        </Link>
      </div>
    );
  };


  return (
    <>
      <div
        className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
        data-nc-id="ProductCard" 
      >
        <Link  to={`/product/${id}`} className="absolute inset-0" aria-label={`Open Product ${data?.name}`}></Link>

        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded overflow-hidden z-1 group">
          <Link to={`/product/${id}`} className="block" aria-label={`Open Product ${data?.name}`}>
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-10 w-full h-0"
              src={data?.images?.[0]?.src}
              className="object-cover w-full h-full drop-shadow-xl"
            />
          </Link>

          { renderStatus() }

          { renderGroupButtons() }
        </div>  

        <div className="space-y-4 px-1 pt-5 pb-2.5">

          <div>
            <h2
              className={`nc-ProductCard__title text-sm md:text-base lg:text-lg font-medium transition-colors`}
            >
              {name}
            </h2>
          </div>

          <div className="flex justify-between items-start">
            {/* <Prices price={+price} /> */}
            <p className="text-sm md:text-base lg:text-lg font-medium text-green-500" dangerouslySetInnerHTML={{ __html: data?.price_html }}></p>
          </div>

          <div className="mx-auto flex content-center">
            <Link to={`/product/${id}`}>
              <ButtonPrimary
                className=""
                fontSize="text-xs"
                sizeClass="py-2 px-4"
              >
                <BagIcon className="w-3.5 h-3.5 mb-0.5" />
                <span className="ml-1">View Product</span>
              </ButtonPrimary>
            </Link>
          </div>
          

        </div>
      </div>
    </>
  );
};

export default ProductCard;
