import React, { FC } from "react";
import { Link } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";
import Prices from "./Prices";
import PricesWithDiscount from "./PricesWithDiscount";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import BagIcon from "./BagIcon";
import calcDiscount from "utils/discountCalc";
import toast from "react-hot-toast";

import NotifyAddTocart from "components/NotifyAddTocart";

import {
  NoSymbolIcon,
} from "@heroicons/react/24/outline";

import { addProductToCart } from "app/cartSlice";
import { useAppDispatch } from "app/hooks";


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
  } = data; 

  const dispatch = useAppDispatch();
  
  const [quantitySelected, setQuantitySelected] = React.useState(1); 

  const addToCartHandler = () => {
    const variantID = 0;
    dispatch(addProductToCart({...data, quantitySelected, variantID}));
    toast.custom(
      (t) => (
        <NotifyAddTocart
          productName={data?.name}
          productImage={data?.images?.[0]?.src}
          qualitySelected={quantitySelected}
          productPrice={+data?.price}
          show={t.visible}
        />
      ),
      { position: "top-right", id: "nc-product-notify", duration: 1000 }
    );
  };  

  const renderStatus = () => {

    if (!data) {
      return null;
    }

    const CLASSES = `nc-shadow-lg rounded-lg flex items-center justify-center absolute top-0 left-0 sm:top-3 sm:left-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300`;

    if (data.stock_status === 'outofstock') {
      
      return (
        <div className={CLASSES}>
          <NoSymbolIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">Sold Out</span>
        </div>
      );
      
    }else if(data.on_sale === true && data.type === 'simple') {

      const percentage = calcDiscount(+data.regular_price, +data.sale_price);

      return (
        <div className={`${CLASSES}`}>
          <span className="leading-none text-green-500 md:text-sm">{percentage}% Off</span>
          {/* <IconDiscount className="w-3.5 h-3.5" /> */}
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
              containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
              src={data?.images?.[0]?.src}
              className="object-cover w-full h-full drop-shadow-xl"
            />
          </Link>

          { renderStatus() }
          
          <div className="hidden lg:block">
           { renderGroupButtons() }
          </div>
        </div>  

        <div className="space-y-4 px-1 pt-5 pb-2.5">

          <div>
            <h2
              className={`nc-ProductCard__title text-sm md:text-base lg:text-lg truncate font-medium transition-colors`}
            >
              {name}
            </h2>
          </div>


          <div className="flex justify-between items-start">
            {
              data.type === 'simple' ? (
                <PricesWithDiscount regular_price={+data.regular_price} sale_price={+data.sale_price}/>
              ) : (
                <p className="text-sm sm:text-base md:text-lg font-normal text-green-500" dangerouslySetInnerHTML={{ __html: data?.price_html }}></p> 
              )

            }
          
            {/* <Prices price={+price} /> */}
          </div>

          <div className="">
            { 
              data.type === 'simple' ? (
                <ButtonPrimary
                  className="rounded-md"
                  fontSize="text-xs"
                  sizeClass="py-2 px-4"
                  onClick={addToCartHandler}
                >
                  <BagIcon className="w-3.5 h-3.5 mb-0.5" />
                  <span className="ml-1">Add to cart</span>
                </ButtonPrimary>
              ) : (
                <Link to={`/product/${id}`}>
                  <ButtonPrimary
                    className="rounded-md"
                    fontSize="text-xs"
                    sizeClass="py-2 px-4"
                  >
                    <span className="ml-1">Choose Options</span>
                  </ButtonPrimary>
                </Link>
              ) 
            }
          </div>

        </div>
      </div>
    </>
  );
};

export default ProductCard;
