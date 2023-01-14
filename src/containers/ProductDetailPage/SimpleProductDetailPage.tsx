import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import LikeButton from "components/LikeButton";
import AccordionInfo from "./AccordionInfo";
import { StarIcon } from "@heroicons/react/24/solid";
import BagIcon from "components/BagIcon";
import NcInputNumber from "components/NcInputNumber";
import {
  NoSymbolIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import IconDiscount from "components/IconDiscount";
import Prices from "components/Prices";
import toast from "react-hot-toast";
import SectionSliderProductCard from "components/SectionSliderProductCard";
import Policy from "./Policy";
import NotifyAddTocart from "components/NotifyAddTocart";
import Review from "./Review"

// 
import { addProductToCart } from "app/cartSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";

export interface SimpleProductDetailPageProps {
  className?: string;
  product?: any,
}

const SimpleProductDetailPage: FC<SimpleProductDetailPageProps> = ({ className = "", product }) => {
  const dispatch = useAppDispatch();

  const [quantitySelected, setQuantitySelected] = React.useState(1);  
  
  const DescriptionData = [
    {
      name: "Description",
      content: product?.short_description
    }
  ]  

  const addToCartHandler = () => {
      const variantID = 0;
      dispatch(addProductToCart({...product, quantitySelected, variantID}));
      toast.custom(
        (t) => (
          <NotifyAddTocart
            productName={product?.name}
            productImage={product?.images?.[0]?.src}
            qualitySelected={quantitySelected}
            productPrice={+product?.price}
            show={t.visible}
          />
        ),
        { position: "top-right", id: "nc-product-notify", duration: 1000 }
      );
  };

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
            {product?.name}
          </h2>

          <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
            {/* <div className="flex text-xl font-semibold">$112.00</div> */}
            
            <Prices
              contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
              price={+product?.price}
            />
            
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
            </div>
          </div>
        </div>

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
        <AccordionInfo data={DescriptionData}/>

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

        <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl mt-7"  dangerouslySetInnerHTML={{__html: product?.description}}>
        </div>
      </div>
    );
  };

  // const renderReviewForm = () => {
  //   return (
  //     <div>
  //       <form className="grid grid-cols-1 gap-12" onSubmit={handleSubmit(onSubmit)}>
          
  //         <input type="text" {...register("product_id")} id="product_id" hidden value={product?.id}/>

  //         <div className="">
  //          <Label>Rate this product</Label>
  //          <FiveStartIconForRate defaultPoint={point} setPoint={setPoints}/>
  //         </div>
          
  //         <div className="">
  //           <Label>Review this product</Label>
  //           <Textarea {...register("review")} id="review"  className="mt-1.5"  placeholder="Your review should be about your experience with the product" />
  //         </div>

  //         <input type="text" hidden {...register("reviewer")} id="reviewer" value={user?.user_email}/>
  //         <input type="text" hidden {...register("reviewer_email")} id="reviewer_email" value={user?.user_nicename}/>
          
  //         <ButtonPrimary
  //           type="submit"
  //           className="flex-1"
  //           >
  //           Submit
  //         </ButtonPrimary>
           
  //       </form>
  //     </div>
  //   )
  // }

  return (
    <div className={`nc-ProductDetailPage ${className}`}>
      {/* Main */}
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
              {product?.images?.map((item: any, index: number) => {
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

          <hr className="border-slate-200 dark:border-slate-700" />

          <Review/>

          <hr className="border-slate-200 dark:border-slate-700" />

          {/* OTHER SECTION */}
          <SectionSliderProductCard
            heading="Customers also purchased"
            subHeading=""
            headingFontClassName="text-2xl font-semibold"
            headingClassName="mb-10 text-neutral-900 dark:text-neutral-50"
            // data={relatedProducts}
          />

        </div>
      </main>

      
    </div>
  );
};

export default SimpleProductDetailPage;
