import React, { FC, useState } from "react";
import Logo from "shared/Logo/Logo";
import MenuBar from "shared/MenuBar/MenuBar";
import AvatarDropdown from "./AvatarDropdown";
import Navigation from "shared/Navigation/Navigation";
import CartDropdown from "./CartDropdown";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { useAppSelector } from "app/hooks";

export interface MainNav2LoggedProps {}

type SearchValue  = {
  search?: string;
}

const MainNav2Logged: FC<MainNav2LoggedProps> = () => {
  const navigate = useNavigate();

  const [showSearchForm, setShowSearchForm] = useState(false);

  const user = useAppSelector((state) => state.auth.user);

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
        className="flex-1 py-2 text-slate-900 dark:text-slate-100"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="bg-slate-50 dark:bg-slate-800 flex items-center space-x-1.5 px-5 h-full rounded">
          {renderMagnifyingGlassIcon()}
          <input
            {...register("search")} 
            // ref={inputRef}
            id="search"
            type="search"
            placeholder="Search for products"
            className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-base"
            autoFocus
          />
          <button type="button" onClick={() => setShowSearchForm(false)}>
            <XMarkIcon className="w-5 h-5" />
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
          <MenuBar />
        </div>

        <div className="lg:flex-initial flex items-center">
          <Logo className="flex-shrink-0" />
        </div>

        <div className="flex-[2] hidden lg:flex justify-center">
          {showSearchForm ? renderSearchForm() : <Navigation />}
        </div>

        <div className="flex-1 flex items-center justify-end text-slate-700 dark:text-slate-100">
          {!showSearchForm && (
            <button
              className="hidden lg:flex w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none items-center justify-center"
              onClick={() => setShowSearchForm(!showSearchForm)}
            >
              {renderMagnifyingGlassIcon()}
            </button>
          )}

          { user === null ? <Link className="mx-2 text-white" to={`/login`}>Login</Link>  :  <AvatarDropdown />}

          <CartDropdown />
        </div>
      </div>
    );
  };

  return (
    <div className="nc-MainNav2Logged relative z-10 bg-navBg dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700">
      <div className="container ">{renderContent()}</div>
    </div>
  );
};

export default MainNav2Logged;
