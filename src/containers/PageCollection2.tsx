import React, { FC, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import SectionSliderCollections from "components/SectionSliderLargeProduct";
import ProductCard from "components/ProductCard";
import SidebarFilters from "./SidebarFilters";
import { PRODUCTS } from "data/data";

import { wooCommerceRequest } from "services/axios";
import {useAppSelector} from 'app/hooks';
import { useLocation } from "react-router-dom";
import { useGetCategoryProductsQuery } from "app/productApi";

export interface PageCollection2Props {
  className?: string;
}

const PageCollection2: FC<PageCollection2Props> = ({ className = "" }) => {
  const location = useLocation()
  const categoryName = location.pathname.split("/")[2];

  // const [products, setProducts] = useState<any>([]);
  const [catgeoryId, setCategoryID] = useState<number>(0);
  const [categoryDetails, setCategoryDetails] = useState<any>({});
  
  const categories =  useAppSelector((state) => state.category.categories);

  const { data, isSuccess } = useGetCategoryProductsQuery(catgeoryId === 0 ? 0 : catgeoryId);
  
  const getCategoryID = () => {
    const category = categories.filter((cat: any) => cat?.slug === categoryName);
    // check
    if(category.length === 1){
      const { id, name, description } = category[0];
      setCategoryDetails({id, name, description})
      setCategoryID(+id);
    }
    return;
  }
  
  useEffect(() => {
    getCategoryID()
  },[categoryName, categories])

  // useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       const response = await wooCommerceRequest.get(
  //         (categoryDetails === undefined ? `products` : `products?category=${categoryDetails.id}`)
  //       );
  //       setProducts(response?.data);  
  //       console.log(response?.data);
            
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getProducts();
  // }, [categoryDetails]);
  

  return (
    <div
      className={`nc-PageCollection2 ${className}`}
      data-nc-id="PageCollection2"
    >
      <Helmet>
        <title>Category || EcoFreaky </title>
      </Helmet>

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          {/* HEADING */}
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              {categoryDetails?.name}
            </h2>
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              {categoryDetails?.description || `Category Description Comes Here`}
            </span>
          </div>

          <hr className="border-slate-200 dark:border-slate-700" />
          <main>
            {/* LOOP ITEMS */}
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3 xl:w-1/4 pr-4">
                <SidebarFilters />
              </div>
              <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mx-4 border-t lg:border-t-0"></div>
              <div className="flex-1 ">
                <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 ">
                  {/* {products?.map((item: any, index: number) => (
                    <ProductCard data={item} key={index} />
                  ))} */}
                  {isSuccess && data?.map((item: any, index: number) => (
                    <ProductCard data={item} key={index} />
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* === SECTION 5 === */}
        <hr className="border-slate-200 dark:border-slate-700" />

        <SectionSliderCollections />

        {/* <hr className="border-slate-200 dark:border-slate-700" /> */}

      </div>
    </div>
  );
};

export default PageCollection2;
