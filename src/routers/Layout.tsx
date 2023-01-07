import { Outlet } from "react-router-dom";
import SiteHeader from "containers/SiteHeader";
import Footer from "shared/Footer/Footer";
import ScrollToTop from "./ScrollToTop";

const Layout = () => {
    return (
        <div className="bg-white text-base dark:bg-slate-900 text-slate-900 dark:text-slate-200">
            <ScrollToTop/>

            <SiteHeader/>

            {/* Content */}
            <Outlet/>

            <Footer/>
        </div>
    )
}

export default Layout;