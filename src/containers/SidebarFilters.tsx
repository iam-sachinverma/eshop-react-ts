import React, { FC } from "react";
import Radio from "shared/Radio/Radio";

// Sort Filter Static DATA
const sortbyDATA = [
  { name: "Price - Low to High", id: "Price-low-high" },
  { name: "Price - High to Low", id: "Price-high-low" },
  { name: "Popularity", id: "Most-Popular" },
  { name: "Newest First", id: "Newest" },
  // { name: "Best Rating", id: "Best-Rating" },
];


export interface SidebarFiltersProps {
  className?: string;
  sortStates?: any,
  setSortStates?: (_input: string) => void,
}

//
const SidebarFilters: FC<SidebarFiltersProps> = ({ 
  sortStates,
  setSortStates,
}) => {

  // // OK
  const renderTabsSortOrder = () => {
    return (
      <div className="relative flex flex-col py-8 space-y-4">
        <h3 className="font-semibold mb-2.5">Sort By</h3>
        {sortbyDATA.map((item) => (
          <Radio
            id={item.id}
            key={item.id}
            name="radioNameSort"
            label={item.name}
            defaultChecked={sortStates === item.id}
            sizeClassName="w-5 h-5"
            onChange={setSortStates}
            className="!text-sm"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="divide-y divide-slate-200 dark:divide-slate-700">
    
      {renderTabsSortOrder()}

    </div>
  );
};

export default SidebarFilters;
