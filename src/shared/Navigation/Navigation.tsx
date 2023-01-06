import React, { useMemo } from "react";
import NavigationItem from "./NavigationItem";
import { NavItemType } from "./NavigationItem"

import { useGetAllCategoryQuery } from "features/category/categoryApiSlice";

function Navigation() {

  const { data:categories, isSuccess } = useGetAllCategoryQuery();

  const allCategories = () => {

    if(isSuccess === false){
      return
    }
  
    const navigation_menu = categories.filter((category: NavItemType) => category.parent === 0)

    return navigation_menu;
  }

  const navigation_menu = useMemo(() => allCategories(),[isSuccess])

  console.log('Navigation Menu', navigation_menu);
  
  return (
    <ul className="nc-Navigation flex items-center">
      {navigation_menu?.map((item: any) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;
