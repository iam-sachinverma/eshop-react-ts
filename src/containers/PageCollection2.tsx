import React, { FC, useState, useCallback, useMemo } from "react";
import { Helmet } from "react-helmet";
import SectionSliderCollections from "components/SectionSliderLargeProduct";
import ProductCard from "components/ProductCard";
import SidebarFilters from "./SidebarFilters";

import { useParams } from "react-router-dom";

import { useGetCategoryProductsQuery } from "features/product/categoryProductApiSlice";

export interface PageCollection2Props {
  className?: string;
}

const PageCollection2: FC<PageCollection2Props> = ({ className = "" }) => {
  const params = useParams();

  const { data:products, isSuccess } = useGetCategoryProductsQuery(params?.category)
  // console.log(data);

  const [isOnSale, setIsIsOnSale] = useState(false);
  const [colorsState, setColorsState] = useState<string[]>([]);
  const [sizesState, setSizesState] = useState<string[]>([]);

  const [attributesState, setAttributesState] = useState<string[]>([]);
  
  // max _ min price
  const [rangePrices, setRangePrices] = useState([100, 500]);
  console.log(`Max Min Price`, rangePrices);

  // const { data:onSaleProducts } = useGetCategoryOnSaleProductsQuery({categoryID:params?.category,OnSale: isOnSale});
  // console.log(onSaleProducts);
  
  // Filter State

  // const [rangePrices, setRangePrices] = useState([100, 500]);
  // const [sortOrderStates, setSortOrderStates] = useState<string>("");

  const handleChangeAttributesFilter = (checked: boolean, name: string) => {
    checked
      ? setAttributesState([...attributesState, name])
      : setAttributesState(attributesState.filter((i) => i !== name))
  }
  
  const handleChangeColors = (checked: boolean, name: string) => {
    checked
      ? setColorsState([...colorsState, name])
      : setColorsState(colorsState.filter((i) => i !== name));
  };

  const handleChangeSizes = (checked: boolean, name: string) => {
    checked
      ? setSizesState([...sizesState, name])
      : setSizesState(sizesState.filter((i) => i !== name));
  };

  const handlePriceRange = (_input: number | number[]) =>
  setRangePrices(_input as number[])

  const handleOnSale = () => {
    setIsIsOnSale((prev) => !prev)
  }

  const filterProduct = (products: any) => {
    
    let arr = [];

    if(colorsState && colorsState.length > 0){
      const data = products.filter((product: any) => {
        return product.attributes.some((attr: any) => attr.options.includes(...colorsState))
      })
      arr.push(...data);
    }

    if(sizesState && sizesState.length > 0){
      const data = products.filter((product: any) => {
        return product.attributes.some((attr: any) => attr.options.includes(...sizesState))
      })
      arr.push(...data);
    }

    return arr;
  }

  const filteredProduct  = useMemo(() => filterProduct(products),[colorsState, sizesState]);

  return (
    <div
      className={`nc-PageCollection2 ${className}`}
      data-nc-id="PageCollection2"
    >
      <Helmet>
        <title>Category || EcoFreaky</title>
      </Helmet>

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          {/* HEADING */}
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              {/* {categoryDetails?.name} */}
              {'Catgeory Name'}
            </h2>
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              { `Category Description Comes Here`}
            </span>
          </div>

          <hr className="border-slate-200 dark:border-slate-700" />
          <main>
            {/* LOOP ITEMS */}
            <div className="flex flex-col lg:flex-row">

              {/* Sidebar */}
              <div className="lg:w-1/3 xl:w-1/4 pr-4">
                <SidebarFilters 
                 colorState={colorsState} 
                 changeColors={handleChangeColors}
                 isOnSaleValue={isOnSale}
                 onSaleHandler={handleOnSale}
                 sizeState={colorsState} 
                 changeSizes={handleChangeSizes}
                 rangePrice={rangePrices}
                 changePrice={handlePriceRange}
                 attributeState={attributesState}
                 changeAttributes={handleChangeAttributesFilter}
                />
              </div>

              <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mx-4 border-t lg:border-t-0"></div>

              {/* Product Card */}
              <div className="flex-1 ">
                <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 ">
                {
                   isSuccess === true ? 
                  (
                    colorsState?.length > 0 ? (
                      filteredProduct?.map((item: any, index: number) => (
                        <ProductCard data={item} key={index} />
                      ))
                    ) : (
                      products?.map((item: any, index: number) => (
                        <ProductCard data={item} key={index} />
                      ))
                    )
                  ) : ('')
                }
                </div>
              </div>

            </div>
          </main>
        </div>

        {/* === SECTION 5 === */}
        {/* <hr className="border-slate-200 dark:border-slate-700" /> */}

      

        {/* <hr className="border-slate-200 dark:border-slate-700" /> */}

      </div>
    </div>
  );
};

export default PageCollection2;
