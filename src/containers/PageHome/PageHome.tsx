import { Helmet } from "react-helmet";
import SectionHero2 from "components/SectionHero/SectionHero2";
import SectionSliderProductCard from "components/SectionSliderProductCard";
import DiscoverMoreSlider from "components/DiscoverMoreSlider";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";
import { useGetAllProductsQuery } from "features/product/productApiSlice";

function PageHome() {
  
  const { data:products, isSuccess } = useGetAllProductsQuery(null);
  
  return (
    <div className="nc-PageHome relative overflow-hidden">
      
      <Helmet>
        <title>EcoFreaky - Shop for economical eco-friendly products</title>
      </Helmet>

      {/* SECTION HERO */}
      <SectionHero2 />

      <div className="container relative space-y-24 my-8 md:my-12 lg:space-y-20 lg:my-14">
        
        {/* SECTION */}

        { isSuccess &&
        <SectionSliderProductCard
          data={[...products].slice(0, 5)}
        />
        }

        <div className="mt-20 lg:mt-30">
          <DiscoverMoreSlider />
        </div>

        { isSuccess &&
        <SectionSliderProductCard
          heading="Best Sellers"
          subHeading="Best selling of the month"
          data={[...products].reverse().slice(0, 6)}
        />
        }


        {/* <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <div>
            <Heading rightDescText="From the Ciseco blog">
              The latest news
            </Heading>
            <SectionMagazine5 />
            <div className="flex mt-16 justify-center">
              <ButtonSecondary>Show all blog articles</ButtonSecondary>
            </div>
          </div>
        </div> */}

        {/*  */}
        <SectionClientSay />
      </div>
    </div>
  );
}

export default PageHome;
