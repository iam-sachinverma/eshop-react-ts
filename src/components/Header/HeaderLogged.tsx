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
  
    const navigation_menu = categories.filter((category: NavItemType) => category.parent === 0)

    return navigation_menu;
  }
  
  const navigation_menu = useMemo(() => allCategories(),[categories])

  console.log(navigation_menu);
  

  return (
    <div className="nc-HeaderLogged sticky top-0 w-full z-40">
      <MainNav2Logged data={navigation_menu} />
    </div>
  );
};

export default HeaderLogged;
