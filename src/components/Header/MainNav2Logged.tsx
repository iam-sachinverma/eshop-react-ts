import React, { FC, useState } from "react";
import { NavLink } from 'react-router-dom'
import Logo from "shared/Logo/Logo";
import MenuBar from "shared/MenuBar/MenuBar";
import AvatarDropdown from "./AvatarDropdown";
import Navigation from "shared/Navigation/Navigation";
import CartDropdown from "./CartDropdown";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { NavItemType } from "shared/Navigation/NavigationItem";

export interface MainNav2LoggedProps {
  data?: NavItemType[];
}

type SearchValue  = {
  search?: string;
}

const MainNav2Logged: FC<MainNav2LoggedProps> = (data) => {

  const navigate = useNavigate();

  const {register, handleSubmit} = useForm<SearchValue>();

  const onSubmit: SubmitHandler<SearchValue> = async (data) => {
    const { search } = data;

    try {
      navigate({
        pathname: "search",
        search: createSearchParams({
            q: `${search}`
        }).toString()
    })      
    } catch (error) {
      console.log(error);
    }
  };

  const inputRef = React.createRef<HTMLInputElement>();

  const renderMagnifyingGlassIcon = () => {
    return (
      <svg
        className="text-black"
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 22L20 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const renderSearchForm = () => {
    return (
      <form
        className="flex-1 py-4 text-slate-900 dark:text-slate-100"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="bg-slate-50 dark:bg-slate-800 flex items-center space-x-1.5 px-5 h-full rounded">
          <input
            {...register("search")} 
            // ref={inputRef}
            id="search"
            type="search"
            placeholder="Search for products"
            className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-base"
            
          />
          <button type="submit">
           {renderMagnifyingGlassIcon()}
          </button>
        </div>
        <input type="submit" hidden />
      </form>
    );
  };

  const renderContent = () => {
    return (
      <div className="h-20 flex justify-between">
        <div className="flex items-center lg:hidden flex-1">
          <MenuBar  navigation={data}/>
        </div>

        <div className="lg:flex-1 flex items-center">
          <Logo className="flex-shrink-0" />
        </div>

        <div className="flex-[3] hidden lg:flex justify-center">
          { renderSearchForm() }
        </div>
        
        <div className="flex-1 flex items-center gap-2 justify-end text-slate-700 dark:text-slate-100">

          <AvatarDropdown />
          
          <CartDropdown />
          
        </div>
      </div>
    );
  };

  const renderTopNavbar = () => {
    return (
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-1.5 dark:bg-gray-900">
        <div className="container flex flex-wrap items-center justify-center mx-auto">
          <p className="text-xs font-medium lg:text-sm">FREE Shipping above ₹ 499* | Delivering Across 🇮🇳</p>
        </div>
      </nav>
    )
  }

  const renderCategoryNavbar = () => {
    return (
      <nav className="bg-white border-gray-200 px-2 sm:px-4 dark:bg-gray-900">
        <div className="container flex flex-wrap items-center justify-center mx-auto">
          <div className="w-full md:w-auto flex" id="navbar-multi-level">
           <Navigation navigation={data}/>
           
            <NavLink
              end
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm lg:text-[15px] font-medium text-dark dark:text-slate-300 py-2.5 px-2 rounded-md hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              to="b2b-offering-bulk-requests"
            > 
              Bulk Request
            </NavLink>
             
          </div>
        </div>
      </nav>
    )
  }

  return (
    <div className="nc-MainNav2Logged relative z-10 bg-navBg dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700">
      { renderTopNavbar() }
      <div className="container">{renderContent()}</div>
      <div className="hidden lg:block">
        { renderCategoryNavbar() }
      </div>
    </div>
  );
};

export default MainNav2Logged;
