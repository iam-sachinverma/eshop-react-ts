import { ComponentType } from "react";

export interface LocationStates {
  "/"?: {};
  "/#"?: {};
  "/home2"?: {};
  "/home3"?: {};

  //
  "/product/:id"?: {};
  "/products/:category"?: {};
  
  //
  "products/16"?: {},
  "products/17"?: {},
  "products/18"?: {},
  "products/19"?: {},
  "products/39"?: {},
  "products/32"?: {},

  
  //
  "/product-detail"?: {};
  "/product-detail-2"?: {};
  "/page-collection"?: {};
  "/page-collection-2"?: {};
  "/page-search"?: {};
  "/home-header-2"?: {};
  //
  "/account"?: {};
  "/account-savelists"?: {};
  "/account-change-password"?: {};
  "/account-billing"?: {};
  "/account-my-order"?: {};
  //
  "/cart"?: {};
  "/checkout"?: {};
  //
  "/blog"?: {};
  "/blog-single"?: {};

  "/about"?: {};
  "/contact"?: {};
  "/login"?: {};
  "/signup"?: {};
  "/forgot-pass"?: {};
  "/page404"?: {};
  "/subscription"?: {};
}

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  exact?: boolean;
  component: ComponentType<Object>;
}
