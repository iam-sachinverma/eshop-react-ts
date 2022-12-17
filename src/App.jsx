import React from "react";
import { Route, Routes } from "react-router-dom";
import PageHome from "containers/PageHome/PageHome";
import Page404 from "containers/Page404/Page404";
import PageContact from "containers/PageContact/PageContact";
import PageAbout from "containers/PageAbout/PageAbout";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageLogin from "containers/PageLogin/PageLogin";
import ProductDetailPage from "containers/ProductDetailPage/ProductDetailPage";
import PageCollection2 from "containers/PageCollection2";
import PageSearch from "containers/PageSearch";

import BlogPage from "containers/BlogPage/BlogPage";
import BlogSingle from "containers/BlogPage/BlogSingle";

import AccountPage from "containers/AccountPage/AccountPage";
import AccountOrder from "containers/AccountPage/AccountOrder";
import AccountPass from "containers/AccountPage/AccountPass";
import AccountBilling from "containers/AccountPage/AccountBilling";
import AccountSavelists from "containers/AccountPage/AccountSavelists";

import CartPage from "containers/ProductDetailPage/CartPage";
import CheckoutPage from "containers/PageCheckout/CheckoutPage";

import { Toaster } from "react-hot-toast";
import Layout from "routers/Layout";
import RequireAuth from "routers/RequiredAuth";

function App() {
  return (
    <>
      <div>
        <Toaster />
      </div>
      {/* MAIN APP */}

      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<PageHome />}></Route>
          <Route path="*" element={<Page404 />}></Route>
          <Route path="/product/:id" element={<ProductDetailPage />}></Route>
          <Route
            path="/products/:category"
            element={<PageCollection2 />}
          ></Route>
          <Route path="/search" element={<PageSearch />}></Route>

          <Route path="/about" element={<PageAbout />}></Route>
          <Route path="/contact" element={<PageContact />}></Route>

          <Route path="/login" element={<PageLogin />}></Route>
          <Route path="/signup" element={<PageSignUp />}></Route>

          <Route path="/cart" element={<CartPage />}></Route>

          <Route path="/blog" element={<BlogPage />}></Route>
          <Route path="/blog-single" element={<BlogSingle />}></Route>

          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/account" element={<AccountPage />}></Route>
            <Route path="/account-my-order" element={<AccountOrder />}></Route>
            <Route path="/checkout" element={<CheckoutPage />}></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
