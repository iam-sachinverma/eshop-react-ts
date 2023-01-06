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
  
    const navigation: NavItemType[] = [];

    categories.map((category: NavItemType) => {
      if(category.parent === 0){
        navigation.push(category);
      }else{
        navigation.map((parent: any) => {
          if(parent.id === category.parent){
            console.log(parent);
          }
        })
      }
    })

    return navigation;
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
