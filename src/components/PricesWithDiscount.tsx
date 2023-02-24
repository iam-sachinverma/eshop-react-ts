import React, { FC } from "react";

export interface PricesWithDiscountProps {
  className?: string;
  regular_price?: number;
  sale_price?: number;
  contentClass?: string;
}

const PricesWithDiscount: FC<PricesWithDiscountProps> = ({
  className = "",
  regular_price,
  sale_price,
  contentClass = "py-1 md:py-1.5 font-normal",
}) => {
  return (
    <div className={`${className}`}>
      <div
        className={`flex items-center border-green-500 rounded-lg ${contentClass}`}
      >
        <span className="text-green-500 !leading-none mr-1 text-sm sm:text-base md:text-lg">
         ₹ {sale_price?.toFixed(2)}
        </span>
        <span className="text-green-500 !leading-none line-through text-sm">
         ₹ {regular_price?.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default PricesWithDiscount;
