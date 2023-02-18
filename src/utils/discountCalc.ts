const calcDiscount = (regular_price: number, sale_price: number) => {
    //
   const discount_percentage = 100 * ( sale_price / regular_price );

   return (100 - Math.floor(discount_percentage) );
}

export default calcDiscount;