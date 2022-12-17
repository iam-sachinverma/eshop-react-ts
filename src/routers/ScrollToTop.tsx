// import { useEffect } from "react";
// import { useLocation, RouteProps } from "react-router-dom";

// export interface ScrollToTopProps {
//   history: RouterProps["history"];
// }

// const ScrollToTop: React.FC<ScrollToTopProps> = ({ history }) => {
   
//   const { pathname } = useL
//   useEffect(() => {
//     const unlisten = history.listen(() => {
//       window.scrollTo(0, 0);
//     });
//     return () => {
//       unlisten();
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return null;
// };

// export default withRouter(ScrollToTop);

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // "document.documentElement.scrollTo" is the magic for React Router Dom v6
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      // behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, [pathname]);

  return null;
}
