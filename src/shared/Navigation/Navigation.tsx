import React from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION_DEMO_2 } from "data/navigation";

import { useGetAllCategoryQuery } from "features/category/categoryApiSlice";

function Navigation() {

  const { data:categories, isSuccess } = useGetAllCategoryQuery();

  const NAVIGATION = isSuccess && categories.map((category: any) => {
    //

  })

  return (
    <ul className="nc-Navigation flex items-center">
      {NAVIGATION_DEMO_2.map((item) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;
