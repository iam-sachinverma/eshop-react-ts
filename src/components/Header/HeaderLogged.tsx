import React, { FC, useMemo } from "react";
import MainNav2Logged from "./MainNav2Logged";
import { NavItemType } from "shared/Navigation/NavigationItem";

import { useGetAllCategoryQuery } from "features/category/categoryApiSlice";


export interface HeaderLoggedProps {}

const HeaderLogged: FC<HeaderLoggedProps> = () => {

  const { data:categories, isSuccess } = useGetAllCategoryQuery();

  const allCategories = () => {

    if(isSuccess === false){
      return
    }
  
    const parent_catgeories = categories.filter((category: NavItemType) => category.parent === 0)

    const category_temp = [...parent_catgeories];    

    const navigation_menu = category_temp.map((category: NavItemType, index: number) => {
      
      if(!category.parent){

        const subCatgeory = categories.filter((cat: NavItemType) => +cat.parent === +category.id)

        if(subCatgeory.length > 0){
          const cat: NavItemType = {
            ...category,
            children: subCatgeory,
            type: "dropdown"
          }

          category = cat;
        }
        
      }

      return category;
    })

    return navigation_menu;
  }
  
  const navigation_menu = useMemo(() => allCategories(),[categories])
  
  return (
    <div className="nc-HeaderLogged sticky top-0 w-full z-40">
      <MainNav2Logged data={navigation_menu} />
    </div>
  );
};

export default HeaderLogged;
