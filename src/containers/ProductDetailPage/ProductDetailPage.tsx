import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import LikeButton from "components/LikeButton";
import AccordionInfo from "./AccordionInfo";
import { StarIcon } from "@heroicons/react/24/solid";
import BagIcon from "components/BagIcon";
import NcInputNumber from "components/NcInputNumber";
import { PRODUCTS } from "data/data";
import {
  NoSymbolIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import IconDiscount from "components/IconDiscount";
import Prices from "components/Prices";
import toast from "react-hot-toast";
import SectionSliderProductCard from "components/SectionSliderProductCard";
import detail1JPG from "images/products/detail1.jpg";
import detail2JPG from "images/products/detail2.jpg";
import detail3JPG from "images/products/detail3.jpg";
import Policy from "./Policy";
import ReviewItem from "components/ReviewItem";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import SectionPromo2 from "components/SectionPromo2";
import ModalViewAllReviews from "./ModalViewAllReviews";
import NotifyAddTocart from "components/NotifyAddTocart";

// 
import { addProductToCart } from "app/cartSlice";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "app/hooks";

import { useGetProductQuery, useGetProductVariationsQuery } from "features/product/productApiSlice"

export interface ProductDetailPageProps {
  className?: string;
}

const ProductDetailPage: FC<ProductDetailPageProps> = ({ className = "" }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  
  const productID = location.pathname.split('/')[2];
   
  // Rtk query hook
  const { data:product, isSuccess:productFullfilled } = useGetProductQuery(productID);
  console.log(product);
  
  const { data:productVariations, isSuccess } = useGetProductVariationsQuery(productID);
  console.log(productVariations);
  
  // Component States
  const { sizes, variants, allOfSizes } = PRODUCTS[0];
  const LIST_IMAGES_DEMO = [detail1JPG, detail2JPG, detail3JPG];
  const [variantActive, setVariantActive] = React.useState(0);
  const [colorSizeVariant, setcolorSizeVariant] = useState<string[]>([]);
  
  const [attributeVariant, setAttributeVariant] = useState<any>([]);

  const [quantitySelected, setQuantitySelected] = React.useState(1);
  const [sizeSelected, setSizeSelected] = React.useState("");
  const [colorSelected, setColorSelected] = React.useState("");
  const [packSetSelected, setPackSetSelected] = React.useState("");
  
  const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] =
    useState(false);

  useEffect(() => {
    const variation = productVariations?.filter((v:any) => v.attributes.some((attr: any) => attr.option === packSetSelected ))
    setAttributeVariant(variation);
  }, [packSetSelected]);

  useEffect(() => {
    const variation = productVariations?.filter((v:any) => v.attributes.some((attr: any) => attr.option === sizeSelected ))
    setAttributeVariant(variation);
  }, [sizeSelected]);

  useEffect(() => {
    const variation = productVariations?.filter((v:any) => v.attributes.some((attr: any) => attr.option === colorSelected ))
    setAttributeVariant(variation);
  },[colorSelected])

  // const addRemoveVariant = (variant: string) => {
  //   let arr:any = [...colorSizeVariant];
    
  //   let isColorContain = arr.includes(variant);
  //   let isSizeContain = arr.includes(variant);

  //   if(!isColorContain || !isSizeContain ){
  //     arr.push(variant);
  //     setcolorSizeVariant(arr);
  //   }
  // }
  
  const DescriptionData = [
    {
      name: "Description",
      content: isSuccess && product?.description
    }
  ]  

  // const notifyAddTocart = () => {
  //   toast.custom(
  //     (t) => (
  //       <NotifyAddTocart
  //         productImage={LIST_IMAGES_DEMO[0]}
  //         qualitySelected={quantitySelected}
  //         show={t.visible}
  //         sizeSelected={sizeSelected}
  //         variantActive={variantActive}
  //       />
  //     ),
  //     { position: "top-right", id: "nc-product-notify", duration: 3000 }
  //   );
  // };

  // const renderVariants = () => {
  //   if (!variants || !variants.length) {
  //     return null;
  //   }
    
  //   return (
  //     <div>
  //       <label htmlFor="">
  //         <span className="text-sm font-medium">
  //           Color:
  //           <span className="ml-1 font-semibold">
  //             {variants[variantActive].name}
  //           </span>
  //         </span>
  //       </label>
  //       <div className="flex mt-3">
  //         {variants.map((variant, index) => (
  //           <div
  //             key={index}
  //             onClick={() => setVariantActive(index)}
  //             className={`relative flex-1 max-w-[75px] h-10 sm:h-11 rounded-full border-2 cursor-pointer ${
  //               variantActive === index
  //                 ? "border-primary-6000 dark:border-primary-500"
  //                 : "border-transparent"
  //             }`}
  //           >
  //             <div className="absolute inset-0.5 rounded-full overflow-hidden z-0">
  //               <img
  //                 src={variant.thumbnail}
  //                 alt=""
  //                 className="absolute w-full h-full object-cover"
  //               />
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };

  const addToCartHandler = () => {
    if(product?.type === 'variable'){
      const variantID = attributeVariant?.[0]?.id;
      dispatch(addProductToCart({...attributeVariant?.[0], name:`${product?.name}`,  quantitySelected, variantID}));
      toast.custom(
        (t) => (
          <NotifyAddTocart
          productImage={isSuccess && attributeVariant?.[0].image.src}
          qualitySelected={quantitySelected}
            productName={product?.name}
            show={t.visible}
            sizeSelected={sizeSelected}
            colorSelected={colorSelected}
            variantActive={variantActive}
            productPrice={+attributeVariant?.[0]?.price}
          />
        ),
        { position: "top-right", id: "nc-product-notify", duration: 3000 }
      );
    }else{
      const variantID = 0;
      dispatch(addProductToCart({...product, quantitySelected, variantID}));
      toast.custom(
        (t) => (
          <NotifyAddTocart
          productImage={isSuccess && product?.images?.[0]?.src}
          qualitySelected={quantitySelected}
            productName={product?.name}
            show={t.visible}
            productPrice={+product?.price}
          />
        ),
        { position: "top-right", id: "nc-product-notify", duration: 3000 }
      );
    }
  };

  const renderV = () => {

    if(product?.type !== "variable"){
      return;
    }

    const isColor = product?.attributes?.some((attr: any) => attr.name === 'Color') 
    const isSize = product?.attributes?.some((attr: any) => attr.name === 'Size')
    const isPackSet = product?.attributes?.some((attr: any) => attr.name === 'Pack Set')
    console.log(isSize);
    console.log(isPackSet);
    console.log(isColor);

    if(isColor){
      return (
        <div className="">{renderColorList()}</div>
      )
    }

    if(isSize) {
      return (
        <div className="">{renderSizeList()}</div>
      )
    }


    if(isColor){
      return (      
        <div className="">{renderPackSet()}</div>
      )
    }
    
  }

  const renderColorList = () => {
    if(isSuccess && product?.type !== "variable"){
      return;
    }

    const colors = product?.attributes?.filter((attr: any) => attr?.name === 'Color');

    return (
      <div className="my-4">
        <div className="flex justify-between font-medium text-sm">
        <span className="text-sm font-medium">
            Color:
            <span className="ml-1 font-semibold">
              {colorSelected}
            </span>
          </span>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 mt-3">
          {colors?.[0]?.options?.map((color: any, index: number) => {
            const isActive = color === colorSelected;
            // const sizeOutStock = !sizes.includes(size);
            return (
              <div
                key={index}
                className={`relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center 
                text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 ${
                  ""
                    ? "text-opacity-20 dark:text-opacity-20 cursor-not-allowed"
                    : "cursor-pointer"
                } ${
                  isActive
                    ? "bg-primary-6000 border-primary-6000 text-white hover:bg-primary-6000"
                    : "border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                }`}
                onClick={() => {
                  // if (sizeOutStock) {
                  //   return;
                  // }
                  setColorSelected(color);
                }}
              >
                {color}
              </div>
            );
          })}
        </div>
      </div>
    )
  }

  const renderSizeList = () => {
    if(isSuccess && product?.type !== "variable"){
      return;
    }
    const sizes = product?.attributes?.filter((attr: any) => attr?.name === 'Size');
    
    return (
      <div>
        <div className="flex justify-between font-medium text-sm">
          <label htmlFor="">
            <span className="">
              Size: 
              <span className="ml-1 font-semibold">{sizeSelected}</span>
            </span>
          </label>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-3">
          {sizes?.[0]?.options?.map((size: any, index: number) => {
            const isActive = size === sizeSelected;
            // const sizeOutStock = !sizes.includes(size);
            return (
              <div
                key={index}
                className={`relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center 
                text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 ${
                  ""
                    ? "text-opacity-20 dark:text-opacity-20 cursor-not-allowed"
                    : "cursor-pointer"
                } ${
                  isActive
                    ? "bg-primary-6000 border-primary-6000 text-white hover:bg-primary-6000"
                    : "border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                }`}
                onClick={() => {
                  // if (sizeOutStock) {
                  //   return;
                  // }
                  setSizeSelected(size);
                }}
              >
                {size}
              </div>
            );
          })}
        </div>
      </div>
    )
  };

  const renderPackSet = () => {
    if(isSuccess && product?.type !== "variable"){
      return;
    }
    
    const pack_sets = product?.attributes?.filter((attr: any) => attr?.name === 'Pack Set');
    return (
      <div className="my-4">
        <div className="flex justify-between font-medium text-sm">
          <label htmlFor="">
            <span className="">
              Pack Set: 
              <span className="ml-1 font-semibold">{packSetSelected}</span>
            </span>
          </label>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 mt-3">
          {pack_sets?.[0]?.options?.map((pack_set: any, index: number) => {
            const isActive = pack_set === packSetSelected;
            // const sizeOutStock = !sizes.includes(size);
            return (
              <div
                key={index}
                className={`relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center 
                text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 cursor-pointer
                ${
                  isActive
                    ? "bg-primary-6000 border-primary-6000 text-white hover:bg-primary-6000"
                    : "border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                }`}
                onClick={() => {
                  // if (sizeOutStock) {
                  //   return;
                  // }
                  setPackSetSelected(pack_set);
                }}
              >
                {pack_set}
              </div>
            );
          })}
        </div>
      </div>
    )
  }

  const renderStatus = () => {
    if (!product) {
      return null;
    }
    const CLASSES =
      "absolute top-3 left-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 nc-shadow-lg rounded-full flex items-center justify-center text-slate-700 text-slate-900 dark:text-slate-300";
    if (product?.featured === true) {
      return (
        <div className={CLASSES}>
          <SparklesIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">Best Seller</span>
        </div>
      );
    }
    if (product?.on_sale === true) {
      return (
        <div className={CLASSES}>
          <IconDiscount className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">On Sale</span>
        </div>
      );
    }
    if (product?.stock_status === 'outstock') {
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

  const renderSectionContent = () => {
    return (
      <div className="space-y-7 2xl:space-y-8">
        {/* ---------- 1 HEADING ----------  */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            {isSuccess && product?.name}
          </h2>

          <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
            {/* <div className="flex text-xl font-semibold">$112.00</div> */}
            {
              isSuccess && product?.type === 'variable' ?
               (
                attributeVariant?.length === 0 ? (
                  <Prices
                  contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
                  price={+product?.price}
                  />
                ) : ( <Prices
                contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
                price={+attributeVariant?.[0]?.price}
                />)
               ) 
               :                (
                <Prices
                contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
                price={+product?.price}
                />
               )
            }
            
            <div className="h-7 border-l border-slate-300 dark:border-slate-700"></div>

            <div className="flex items-center">
              <a
                href="#reviews"
                className="flex items-center text-sm font-medium"
              >
                <StarIcon className="w-5 h-5 pb-[1px] text-yellow-400" />
                <div className="ml-1.5 flex">
                  <span>4.9</span>
                  <span className="block mx-2">·</span>
                  <span className="text-slate-600 dark:text-slate-400 underline">
                    142 reviews
                  </span>
                </div>
              </a>
              {/* <span className="hidden sm:block mx-2.5">·</span> */}
              {/* Status */}
              {/* <div className="hidden sm:flex items-center text-sm">
                <SparklesIcon className="w-3.5 h-3.5" />
                <span className="ml-1 leading-none">{status}</span>
              </div> */}
            </div>
          </div>
        </div>

        {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}
        {/* <div className="">{renderVariants()}</div>
        <div className="">{renderSizeList()}</div> */}
        <div className="">{renderV()}</div>

        {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
        <div className="flex space-x-3.5">
          <div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
            <NcInputNumber
              defaultValue={quantitySelected}
              onChange={setQuantitySelected}
            />
          </div>
          <ButtonPrimary
            className="flex-1 flex-shrink-0"
            onClick={addToCartHandler}
          >
            <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
            <span className="ml-3">Add to cart</span>
          </ButtonPrimary>
        </div>

        {/*  */}
        <hr className=" 2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>
        {/*  */}

        {/* ---------- 5 ----------  */}
        <AccordionInfo data={isSuccess === true ? DescriptionData : []}/>

        {/* ---------- 6 ----------  */}
        <div className="hidden xl:block">
          <Policy />
        </div>
      </div>
    );
  };

  const renderDetailSection = () => {
    return (
      <div className="">
        <h2 className="text-2xl font-semibold">Product Details</h2>
        <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl mt-7">
          <p>
            The patented eighteen-inch hardwood Arrowhead deck --- finely
            mortised in, makes this the strongest and most rigid canoe ever
            built. You cannot buy a canoe that will afford greater satisfaction.
          </p>
          <p>
            The St. Louis Meramec Canoe Company was founded by Alfred Wickett in
            1922. Wickett had previously worked for the Old Town Canoe Co from
            1900 to 1914. Manufacturing of the classic wooden canoes in Valley
            Park, Missouri ceased in 1978.
          </p>
          <ul>
            <li>Regular fit, mid-weight t-shirt</li>
            <li>Natural color, 100% premium combed organic cotton</li>
            <li>
              Quality cotton grown without the use of herbicides or pesticides -
              GOTS certified
            </li>
            <li>Soft touch water based printed in the USA</li>
          </ul>
        </div>
      </div>
    );
  };

  const renderReviews = () => {
    return (
      <div className="">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold flex items-center">
          <StarIcon className="w-7 h-7 mb-0.5" />
          <span className="ml-1.5"> 4,87 · 142 Reviews</span>
        </h2>

        {/* comment */}
        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-11 gap-x-28">
            <ReviewItem />
            <ReviewItem
              data={{
                comment: `I love the charcoal heavyweight hoodie. Still looks new after plenty of washes. 
                  If you’re unsure which hoodie to pick.`,
                date: "December 22, 2021",
                name: "Stiven Hokinhs",
                starPoint: 5,
              }}
            />
            <ReviewItem
              data={{
                comment: `The quality and sizing mentioned were accurate and really happy with the purchase. Such a cozy and comfortable hoodie. 
                Now that it’s colder, my husband wears his all the time. I wear hoodies all the time. `,
                date: "August 15, 2022",
                name: "Gropishta keo",
                starPoint: 5,
              }}
            />
            <ReviewItem
              data={{
                comment: `Before buying this, I didn't really know how I would tell a "high quality" sweatshirt, but after opening, I was very impressed. 
                The material is super soft and comfortable and the sweatshirt also has a good weight to it.`,
                date: "December 12, 2022",
                name: "Dahon Stiven",
                starPoint: 5,
              }}
            />
          </div>

          <ButtonSecondary
            onClick={() => setIsOpenModalViewAllReviews(true)}
            className="mt-10 border border-slate-300 dark:border-slate-700 "
          >
            Show me all 142 reviews
          </ButtonSecondary>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-ProductDetailPage ${className}`}>
      {/* MAIn */}
      <main className="container mt-5 lg:mt-11">
        <div className="lg:flex">
          {/* CONTENT */}
          <div className="w-full lg:w-[55%] ">
            {/* HEADING */}
            <div className="relative">
              <div className="aspect-w-16 aspect-h-16">
                <img
                  src={product?.images?.[0]?.src}
                  className="w-full rounded-2xl object-cover"
                  alt="product detail 1"
                />
              </div>
              {/* Render Status */}
              {renderStatus()}

              {/* META FAVORITES */}
              <LikeButton className="absolute right-3 top-3 " />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-8 xl:mt-8">
              {isSuccess && product?.images?.map((item: any, index: number) => {
                if(index >= 1) {
                  return (
                    <div
                      key={index}
                      className="aspect-w-11 xl:aspect-w-10 2xl:aspect-w-11 aspect-h-16"
                    >
                      <img
                        src={item?.src}
                        className="w-full rounded-2xl object-fill"
                        alt="product detail 1"
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
            {renderSectionContent()}
          </div>
        </div>

        {/* DETAIL AND REVIEW */}
        <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">
          <div className="block xl:hidden">
            <Policy />
          </div>

          {renderDetailSection()}

          <hr className="border-slate-200 dark:border-slate-700" />

          {renderReviews()}

          <hr className="border-slate-200 dark:border-slate-700" />

          {/* OTHER SECTION */}
          <SectionSliderProductCard
            heading="Customers also purchased"
            subHeading=""
            headingFontClassName="text-2xl font-semibold"
            headingClassName="mb-10 text-neutral-900 dark:text-neutral-50"
          />

        </div>
      </main>

      {/* MODAL VIEW ALL REVIEW */}
      <ModalViewAllReviews
        show={isOpenModalViewAllReviews}
        onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
      />
    </div>
  );
};

export default ProductDetailPage;
