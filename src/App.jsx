import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Loader from "components/Loader/Loader";

// Wrapper
import Layout from "routers/Layout";
import RequireAuth from "routers/RequiredAuth";

import PageHome from "containers/PageHome/PageHome";
// import PageCollection2 from "containers/PageCollection2";
// import ProductType from "containers/ProductDetailPage/ProductType";

// Lazy Load Components

const PageCollection2 = lazy(() =>
  import(/* webpackPrefetch: true */ "containers/PageCollection2")
);

const ProductType = lazy(() =>
  import(/* webpackPrefetch: true */ "containers/ProductDetailPage/ProductType")
);

const PageSearch = lazy(() => import("containers/PageSearch"));

const AccountPage = lazy(() => import("containers/AccountPage/AccountPage"));
const AccountOrder = lazy(() => import("containers/AccountPage/AccountOrder"));

const CartPage = lazy(() => import("containers/ProductDetailPage/CartPage"));
const CheckoutPage = lazy(() => import("containers/PageCheckout/CheckoutPage"));

const Page404 = lazy(() => import("containers/Page404/Page404"));
const PageContact = lazy(() => import("containers/PageContact/PageContact"));
const PageAbout = lazy(() => import("containers/PageAbout/PageAbout"));
const PageSignUp = lazy(() => import("containers/PageSignUp/PageSignUp"));
const PageLogin = lazy(() => import("containers/PageLogin/PageLogin"));

const BlogPage = lazy(() => import("containers/BlogPage/BlogPage"));
const BlogSingle = lazy(() => import("containers/BlogPage/BlogSingle"));

const PageBulkRequest = lazy(() =>
  import("containers/PageBulkRequest/PageBulkRequest")
);

const PagePrivacyPolicy = lazy(() =>
  import("containers/PageKnowMore/PagePrivacyPolicy")
);

const PageRefundReturnPolicy = lazy(() =>
  import("containers/PageKnowMore/PageRefundReturnPolicy")
);

const PageTerms = lazy(() => import("containers/PageKnowMore/PageTerms"));

function App() {
  return (
    <>
      <div>
        <Toaster />
      </div>
      {/* MAIN APP */}

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route index element={<PageHome />}></Route>
            <Route path="*" element={<Page404 />}></Route>

            <Route path="/product/:id" element={<ProductType />}></Route>

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

            <Route
              path="b2b-offering-bulk-requests"
              element={<PageBulkRequest />}
            ></Route>

            <Route
              path="/privacy-policy"
              element={<PagePrivacyPolicy />}
            ></Route>

            <Route path="/terms-and-conditions" element={<PageTerms />}></Route>

            <Route
              path="/refund-exchange-returns-policy"
              element={<PageRefundReturnPolicy />}
            ></Route>

            {/* Protected Routes */}
            <Route element={<RequireAuth />}>
              <Route path="/account" element={<AccountPage />}></Route>
              <Route
                path="/account-my-order"
                element={<AccountOrder />}
              ></Route>
              <Route path="/checkout" element={<CheckoutPage />}></Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
