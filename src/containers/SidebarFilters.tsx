import { FC } from "react";
import Radio from "shared/Radio/Radio";

// DEMO DATA
const DATA_sortOrderRadios = [
  { name: "Newest", id: "Newest" },
  { name: "Most Popular", id: "Most-Popular" },
  // { name: "Best Rating", id: "Best-Rating" },
  { name: "Price Low - High", id: "Price-low-high" },
  { name: "Price High - Low", id: "Price-high-low" },
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
        <h3 className="font-semibold mb-2.5">Sort order</h3>
        {DATA_sortOrderRadios.map((item) => (
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
