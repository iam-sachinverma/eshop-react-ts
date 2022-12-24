import rightImg from "images/hero-right1.png";
import React, { FC } from "react";
import SectionFounder from "./SectionFounder";
// import SectionStatistic from "./SectionStatistic";
import { Helmet } from "react-helmet";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionHero from "./SectionHero";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";
// import SectionPromo3 from "components/SectionPromo3";

export interface PageAboutProps {
  className?: string;
}

const PageAbout: FC<PageAboutProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-PageAbout overflow-hidden relative ${className}`}
      data-nc-id="PageAbout"
    >
      <Helmet>
        <title>About || EcoFreaky</title>
      </Helmet>

      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <SectionHero
          rightImg={rightImg}
          heading="👋 About Us."
          btnText=""
          subHeading="We noticed that we humans are highly dependent on products that are
          harming the environment. While on the other hand Eco friendly start
          ups and environmental organisations have been trying hard to save
          the earth with different strategies, their efforts have been
          overpowered by big companies producing tons of waste everyday. We at
          EcoFreaky aim to bring together like minded producers and
          manufacturers that develop Eco friendly, sustainable and durable
          products and drive solutions in order to repair the harm done to the
          environment. EcoFreaky is a market place where you can get your
          hands on the finest products which are environment friendly and
          affordable along with sustainable and durable packaging at the same
          time."
        />

        <SectionFounder />
        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay />
        </div>

        {/* <SectionStatistic /> */}

        {/* <SectionPromo3 /> */}
      </div>
    </div>
  );
};

export default PageAbout;
