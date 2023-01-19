import { FC, useState, useCallback, useMemo } from "react";
import { Helmet } from "react-helmet";
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

  const [sortOrderStates, setSortOrderStates] = useState<string>("");

  console.log(sortOrderStates);

  const handleSortOrder = useCallback(
    (_input: string) => {
      setSortOrderStates(_input)
    },[sortOrderStates]
  )

  const filterProduct = (products: any) => {

    if(!isSuccess){
      return
    }
    
    let arr = [...products];

    if(sortOrderStates === 'Newest'){
      arr.sort((a, b) => +new Date(a.date_created) - +new Date(b.date_created))
    }

    if(sortOrderStates === 'Price-low-high'){
      arr.sort((a, b) => a.price - b.price)
    }

    if(sortOrderStates === 'Price-high-low'){
      arr.sort((a, b) => b.price - a.price)
    }

    if(sortOrderStates === 'Newest'){
      arr.sort((a, b) => b.total_sales - a.total_sales)
    }

    // if(colorsState && colorsState.length > 0){
    //   const data = products.filter((product: any) => {
    //     return product.attributes.some((attr: any) => attr.options.includes(...colorsState))
    //   })
    //   arr.push(...data);
    // }

    return arr;
  }

  const filteredProduct  = useMemo(() => filterProduct(products),[sortOrderStates, isSuccess, products]);

  return (
    <div
      className={`nc-PageCollection2 ${className}`}
      data-nc-id="PageCollection2"
    >
      <Helmet>
        <title>Category || EcoFreaky</title>
      </Helmet>

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-5 lg:space-y-10">

          <main>
            {/* LOOP ITEMS */}
            <div className="flex flex-col lg:flex-row">

              {/* Sidebar */}
              <div className="lg:w-1/3 xl:w-1/4 pr-4">
                <SidebarFilters 
                 sortStates={sortOrderStates}
                 setSortStates={handleSortOrder}
                />
              </div>

              <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mx-4 border-t lg:border-t-0"></div>

              {/* Product Card */}
              <div className="flex-1 ">
                <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 ">
                {
                   
                  isSuccess && filteredProduct?.map((item: any, index: number) => (
                    <ProductCard data={item} key={index} />
                  ))
                    
                }
                </div>
              </div>

            </div>
          </main>
        </div>

      </div>
    </div>
  );
};

export default PageCollection2;
