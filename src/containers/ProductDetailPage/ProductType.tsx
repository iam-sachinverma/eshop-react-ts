import React from "react";
import ProductDetailPage from "./ProductDetailPage";
import SimpleProductDetailPage from "./SimpleProductDetailPage"
import Loader from "components/Loader/Loader";

import { useGetProductQuery } from "features/product/productApiSlice";
import { useParams } from "react-router-dom";

const ProductType = () => {

  const params = useParams();

  const { data:productData, isSuccess:productFullfilled } = useGetProductQuery(params?.id);

  let content;

  if(!productFullfilled) {
    content = (
      <main className="">
        <Loader></Loader>
      </main>
    )
  }else{
    content = productData?.type === 'variable' ? (
      <ProductDetailPage product={productData}/>
    ) : (
      <SimpleProductDetailPage product={productData}/>
    )
  }

  return content;
};

export default ProductType;
