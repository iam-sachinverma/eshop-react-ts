import { Helmet } from "react-helmet";
import backgroundLineSvg from "images/Moon.svg";
import ButtonPrimary from "shared/Button/ButtonPrimary";

const PageBulkRequest = () => {
    return (
      <div>

        <Helmet>
         <title>B2B Offering & Bulk Requests | EcoFreaky</title>
        </Helmet>

        <div
          className={`nc-SectionHero2Item nc-SectionHero2Item--animation flex flex-col-reverse lg:flex-col relative overflow-hidden`}
        >

          {/* BG */}
          <div className="absolute inset-0 bg-[#F7F0EA]">
            <img
              className="absolute w-full h-full object-contain"
              src={backgroundLineSvg}
              alt="hero"
            />
          </div>

          <div className="relative container pb-0 pt-14 sm:pt-20 lg:py-44 mb-14 lg:mb-1">
            <div
              className={`relative z-[1] w-full max-w-3xl space-y-8 sm:space-y-14 nc-SectionHero2Item__left`}
            >
              <div className="space-y-5 sm:space-y-6">
                <h2 className="nc-SectionHero2Item__heading font-semibold text-3xl !leading-[114%] text-slate-900">
                 Bulk Order Request
                </h2>
                <span className="nc-SectionHero2Item__subheading block text-base md:text-xl text-slate-700 font-medium">
                 Thank you for your interest in placing a bulk order with EcoFreaky. 
                 You can shortlist the products available on our website and give us a call or text on whatsapp for a better understanding.
                </span>
                
              </div>

              <ButtonPrimary
                className="nc-SectionHero2Item__button dark:bg-slate-900"
                sizeClass="py-2 px-6 sm:py-4 sm:px-9"
                // href={`tel:8700807259`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-4">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0l-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
                </svg>

                <span>
                  Get a quote
                </span>
              </ButtonPrimary>

            </div>
            {/* <div className="mt-10 lg:mt-0 lg:absolute right-0 bottom-0 top-0 w-full max-w-2xl xl:max-w-3xl 2xl:max-w-4xl">
              <img
                className="w-full h-full object-contain object-right-bottom nc-SectionHero2Item__image"
                src={bulkImage}
                // alt={item.heading}
              />
            </div> */}
          </div>
        </div>

      </div>
      
    )
}

export default PageBulkRequest;