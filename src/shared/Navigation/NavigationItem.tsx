import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React, { FC, Fragment, useState } from "react";
import { NavLink } from "react-router-dom";

export interface NavItemType {
  id: string;
  name: string;
  slug: string;
  parent: number;
  description?: string;
  display?: string;
  image?: any;
  menu_order?: number;
  count?: number;
  _links?: any;
  // children?: NavItemType[];
  [key: string]: any;
}

export interface NavigationItemProps {
  menuItem: NavItemType;
}

const NavigationItem: FC<NavigationItemProps> = ({ menuItem }) => {
  const [menuCurrentHovers, setMenuCurrentHovers] = useState<string[]>([]);

  const onMouseEnterMenu = (id: string) => {
    setMenuCurrentHovers((state) => [...state, id]);
  };

  const onMouseLeaveMenu = (id: string) => {
    setMenuCurrentHovers((state) => {
      return state.filter((item, index) => {
        return item !== id && index < state.indexOf(id);
      });
    });
  };


  // ===================== MENU DROPDOW =====================
  const renderDropdownMenu = (menuDropdown: NavItemType) => {
    const isHover = menuCurrentHovers.includes(menuDropdown.id);
    return (
      <Popover
        as="li"
        className="menu-item menu-dropdown relative"
        onMouseEnter={() => onMouseEnterMenu(menuDropdown.id)}
        onMouseLeave={() => onMouseLeaveMenu(menuDropdown.id)}
      >
        {() => (
          <>
            <Popover.Button as={Fragment}>
              {renderMainItem(menuDropdown)}
            </Popover.Button>
            <Transition
              as={Fragment}
              show={isHover}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className="sub-menu absolute transform z-10 w-56 top-full left-0"
              >
                <ul className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 text-sm relative bg-white dark:bg-neutral-900 py-4 grid space-y-1">
                  {menuDropdown.children?.map((i:NavItemType) => {
                    if (i.type) {
                      return renderDropdownMenuNavlinkHasChild(i);
                    } else {
                      return (
                        <li key={i.id} className="px-2">
                          {renderDropdownMenuNavlink(i)}
                        </li>
                      );
                    }
                  })}
                </ul>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderDropdownMenuNavlink = (item: NavItemType) => {
    return (
      <NavLink
        end
        rel="noopener noreferrer"
        className={({ isActive }) => isActive ? "flex items-center font-normal text-neutral-6000 dark:text-neutral-400 py-2 px-4 rounded-md hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200" : "flex items-center font-normal text-neutral-6000 dark:text-neutral-400 py-2 px-4 rounded-md hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"}
        to={`products/${item?.id}`}
      >
        {item.name}
        {item.type && (
          <ChevronDownIcon
            className="ml-2 h-4 w-4 text-neutral-500"
            aria-hidden="true"
          />
        )}
      </NavLink>
    );
  };

  const renderDropdownMenuNavlinkHasChild = (item: NavItemType) => {
    const isHover = menuCurrentHovers.includes(item.id);
    return (
      <Popover
        as="li"
        key={item.id}
        className="menu-item menu-dropdown relative px-2"
        onMouseEnter={() => onMouseEnterMenu(item.id)}
        onMouseLeave={() => onMouseLeaveMenu(item.id)}
      >
        {() => (
          <>
            <Popover.Button as={Fragment}>
              {renderDropdownMenuNavlink(item)}
            </Popover.Button>
            <Transition
              as={Fragment}
              show={isHover}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className="sub-menu absolute z-10 w-56 left-full pl-2 top-0"
              >
                <ul className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 text-sm relative bg-white dark:bg-neutral-900 py-4 grid space-y-1">
                  {item.children?.map((i:NavItemType) => {
                    if (i.type) {
                      return renderDropdownMenuNavlinkHasChild(i);
                    } else {
                      return (
                        <li key={i.id} className="px-2">
                          {renderDropdownMenuNavlink(i)}
                        </li>
                      );
                    }
                  })}
                </ul>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  

  // ===================== MENU MAIN MENU =====================

  // custom by edit sachin
  const renderMainItem = (item: NavItemType) => {
    return (
      <div className="h-20 flex-shrink-0 flex items-center">
        <NavLink
          end
          
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm lg:text-[15px] font-medium text-white dark:text-slate-300 py-2.5 px-4 xl:px-5 rounded-full hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          to={`products/${item?.id}`}
        > 
          {item.name.includes('&amp;') ? item.name.replace('&amp;', '&') : item.name}
          {item.type && (
            <ChevronDownIcon
              className="ml-1 -mr-1 h-4 w-4 text-slate-400"
              aria-hidden="true"
            />
          )}
        </NavLink>
      </div>
    );
  };

  switch (menuItem.type) {
    case "dropdown":
      return renderDropdownMenu(menuItem);
    default:
      return (
        <li className="menu-item flex-shrink-0">{renderMainItem(menuItem)}</li>
      );
  }
  
};

export default NavigationItem;
