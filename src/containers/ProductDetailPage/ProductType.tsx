import ProductDetailPage from "./ProductDetailPage";
import SimpleProductDetailPage from "./SimpleProductDetailPage"

import { useParams } from "react-router-dom";
import { useGetProductQuery } from "features/product/productApiSlice";

const ProductType = () => {

  const params = useParams();

  const { data:productData, isSuccess:productFullfilled, isFetching } = useGetProductQuery(params?.id);

  let content;

  if(productFullfilled){
    content = productData.type === 'variable' ? (
      <ProductDetailPage product={productData}/>
    ) : (
      <SimpleProductDetailPage product={productData}/>
    )
  }

  return content;
};

export default ProductType;
