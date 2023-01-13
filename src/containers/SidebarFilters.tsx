import React, { FC, useEffect, useState } from "react";

import Checkbox from "shared/Checkbox/Checkbox";
import Slider from "rc-slider";
import Radio from "shared/Radio/Radio";
import MySwitch from "components/MySwitch";

import { useGetAttributeTermsQuery } from "features/product/productApiSlice";

// DEMO DATA
const DATA_categories = [
  {
    name: "Backpacks",
  },
  {
    name: "Travel Bags",
  },
  {
    name: "Laptop Sleeves",
  },
  {
    name: "Organization",
  },
  {
    name: "Accessories",
  },
];

const DATA_colors = [
  { name: "Green" },
  { name: "Blue" },
];

const DATA_sortOrderRadios = [
  { name: "Most Popular", id: "Most-Popular" },
  { name: "Best Rating", id: "Best-Rating" },
  { name: "Newest", id: "Newest" },
  { name: "Price Low - Hight", id: "Price-low-hight" },
  { name: "Price Hight - Low", id: "Price-hight-low" },
];

const PRICE_RANGE = [1, 500];

export interface SidebarFiltersProps {
  className?: string;
  colorState?: any;
  changeColors: (checked: boolean, item:any) => void;
  sizeState?: any;
  changeSizes: (checked: boolean, item:any) => void;
  isOnSaleValue?: boolean;
  onSaleHandler: () => void;
  rangePrice?: any,
  changePrice?: (_input: number | number[]) => void;
  attributeState: any,
  changeAttributes: (checked: boolean, item:any) => void;
}

//
const SidebarFilters: FC<SidebarFiltersProps> = ({ 
  className = "", 
  attributeState,
  changeAttributes,
  colorState, 
  changeColors,
  sizeState,
  changeSizes,
  isOnSaleValue, 
  onSaleHandler,
  rangePrice,
  changePrice
}) => {

  const { data:colorTerms, isSuccess:colorTermsFullfilled } = useGetAttributeTermsQuery(1);
  const { data:sizeTerms, isSuccess:sizeTermsFullfilled } = useGetAttributeTermsQuery(2);
  
  //
  // const [rangePrices, setRangePrices] = useState([100, 500]);
  const [sortOrderStates, setSortOrderStates] = useState<string>("");
  // const [isOnSale, setIsIsOnSale] = useState(true);
  // const [colorsState, setColorsState] = useState<string[]>([]);
  // const [categoriesState, setCategoriesState] = useState<string[]>([]);
  
  //
  // const handleChangeCategories = (checked: boolean, name: string) => {
  //   checked
  //     ? setCategoriesState([...categoriesState, name])
  //     : setCategoriesState(categoriesState.filter((i) => i !== name));
  // };

  // const handleChangeColors = (checked: boolean, name: string) => {
  //   checked
  //     ? setColorsState([...colorsState, name])
  //     : setColorsState(colorsState.filter((i) => i !== name));
  // };

  // OK
  // const renderTabsCategories = () => {
  //   return (
  //     <div className="relative flex flex-col pb-8 space-y-4">
  //       <h3 className="font-semibold mb-2.5">Categories</h3>
  //       {DATA_categories.map((item) => (
  //         <div key={item.name} className="">
  //           <Checkbox
  //             name={item.name}
  //             label={item.name}
  //             defaultChecked={categoriesState.includes(item.name)}
  //             sizeClassName="w-5 h-5"
  //             labelClassName="text-sm font-normal"
  //             onChange={(checked) => handleChangeCategories(checked, item.name)}
  //           />
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  // OK
  const renderTabsColor = () => {
    return (
      <div className="relative flex flex-col py-8 space-y-4">
        <h3 className="font-semibold mb-2.5">Colors</h3>
        {colorTermsFullfilled && colorTerms?.map((item: any) => (
          <div key={item.name} className="">
            <Checkbox
              sizeClassName="w-5 h-5"
              labelClassName="text-sm font-normal"
              name={item.name}
              label={item.name}
              // defaultChecked={colorsState.includes(item.name)}
              onChange={(checked) => changeColors(checked, item.name)}
            />
          </div>
        ))}
      </div>
    );
  };

  //Ok
  const renderTabsSize = () => {
    return (
      <div className="relative flex flex-col py-8 space-y-4">
        <h3 className="font-semibold mb-2.5">Sizes</h3>
        {sizeTermsFullfilled && sizeTerms?.map((item: any) => (
          <div key={item.name} className="">
            <Checkbox
              sizeClassName="w-5 h-5"
              labelClassName="text-sm font-normal"
              name={item.name}
              label={item.name}
              // defaultChecked={colorsState.includes(item.name)}
              onChange={(checked) => changeColors(checked, item.name)}
            />
          </div>
        ))}
      </div>
    );
  };

  // OK
  const renderTabsPriceRage = () => {
    return (
      <div className="relative flex flex-col py-8 space-y-5 pr-3">
        <div className="space-y-5">
          <span className="font-semibold">Price range</span>
          <Slider
            range
            min={PRICE_RANGE[0]}
            max={PRICE_RANGE[1]}
            step={1}
            defaultValue={[rangePrice[0], rangePrice[1]]}
            allowCross={false}
            onChange={
              changePrice
            }
          />
        </div>

        <div className="flex justify-between space-x-5">
          <div>
              <label
              htmlFor="minPrice"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Min price
            </label>
            <div className="mt-1 relative rounded-md">
              <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">
                ₹
              </span>
              <input
                type="text"
                name="minPrice"
                disabled
                id="minPrice"
                className="block w-32 pr-10 pl-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                value={rangePrice[0]}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="maxPrice"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Max price
            </label>
            <div className="mt-1 relative rounded-md">
              <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">
                ₹
              </span>
              <input
                type="text"
                disabled
                name="maxPrice"
                id="maxPrice"
                className="block w-32 pr-10 pl-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                value={rangePrice[1]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // // OK
  // const renderTabsSortOrder = () => {
  //   return (
  //     <div className="relative flex flex-col py-8 space-y-4">
  //       <h3 className="font-semibold mb-2.5">Sort order</h3>
  //       {DATA_sortOrderRadios.map((item) => (
  //         <Radio
  //           id={item.id}
  //           key={item.id}
  //           name="radioNameSort"
  //           label={item.name}
  //           defaultChecked={sortOrderStates === item.id}
  //           sizeClassName="w-5 h-5"
  //           onChange={setSortOrderStates}
  //           className="!text-sm"
  //         />
  //       ))}
  //     </div>
  //   );
  // };

  return (
    <div className="divide-y divide-slate-200 dark:divide-slate-700">
      {/* {renderTabsCategories()} */}
      
      {renderTabsColor()}

      {renderTabsSize()}

      {/* {renderTabsPriceRage()} */}


      {/* <div className="py-8 pr-2">
        <MySwitch
          label="On sale!"
          desc="Products currently on sale"
          enabled={isOnSaleValue}
          onChange={onSaleHandler}
        />
      </div> */}

      {/* {renderTabsSortOrder()} */}

    </div>
  );
};

export default SidebarFilters;
