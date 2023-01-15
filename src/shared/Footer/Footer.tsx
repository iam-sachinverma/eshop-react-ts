import Logo from "shared/Logo/Logo";
import SocialsList1 from "shared/SocialsList1/SocialsList1";
import { CustomLink } from "data/types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "1",
    title: "About",
    menus: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact Us" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    id: "2",
    title: "Product Categories",
    menus: [
      { href: "/products/46", label: "Save more on combos" },
      { href: "/products/33", label: "Personal Care" },
      { href: "/products/42", label: "Bamboo Products" },
      { href: "/products/37", label: "Stationery" },
      { href: "/products/38", label: "Home & Decor" },
    ],
  },
  {
    id: "3",
    title: "Known More",
    menus: [
      { href: "#", label: "Privacy Policy" },
      { href: "#", label: "Refund, Exchange and Returns Policy" },
      { href: "#", label: "Terms and conditions" },
    ],
  },
];

const Footer: React.FC = () => {

  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold dark:text-neutral-200 text-white">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              {/* <a
                key={index}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a> */}
              <Link 
                key={index}
                to={`${item.href}`} 
                className=" text-white hover:text-white dark:hover:text-white"
                rel="noopener noreferrer"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="nc-Footer bg-navBg  relative py-20 lg:pt-28 lg:pb-24 border-t border-neutral-200 dark:border-neutral-700">
      <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
        <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
          <div className="col-span-2 md:col-span-1">
            <Logo />
          </div>
          <div className="col-span-2 flex items-center md:col-span-3">
            <SocialsList1 className="flex items-centerspace-x-2 lg:space-x-0 lg:flex-col lg:space-y-3 lg:items-start" />
          </div>
        </div>
        {widgetMenus.map(renderWidgetMenuItem)}
      </div>
    </div>
  );
};

export default Footer;
