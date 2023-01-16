import { FC, useId } from "react";
import Glide from "@glidejs/glide";
import Heading from "components/Heading/Heading";
import { useEffect } from "react";

export interface SectionClientSayProps {
  className?: string;
}

const DEMO_DATA = [
  {
    id: 1,
    image:
      "https://ik.imagekit.io/de3sec/assets/Subhajit_Mukherjee__KJasOtr2.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1662201254280",
    clientName: "Subhajit Mukherjee",
    content:
      "I believe that this concept has great potential and my goal of living an eco-friendly life has now become a real possibility.",
    designation: "Mission Green Mumbai",
  },
  {
    id: 2,
    image:
      "https://ik.imagekit.io/de3sec/assets/Nest_man_of_India_8r9Q3Pdvr.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1662201254279",
    clientName: "Rakesh Khatri",
    content:
      "Ecofreaky can really change how we perceive sustainable living.  It will bring us one step closer to save this planet",
    designation: "Nest Man Of India",
  },
  {
    id: 3,
    image:
      "https://ik.imagekit.io/de3sec/assets/Bamboo_Man_Of_India_2YgQApg7ID.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1662201254292",
    clientName: "Yogesh Shinde",
    content:
      "This marketplace will easily provide a guilt-free shopping experience to consumers because other marketplaces generate a lot of waste in deliveries",
    designation: "Bamboo Man of India",
  },
  {
    id: 4,
    image:
    "https://ik.imagekit.io/de3sec/assets/Recycle_Man_on_India_7Cfnq6Z5e.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1662201254289",
    clientName: "Binish Desai",
    content:
      "I have always wanted a one-stop marketplace for sustainable products to cut down the hassle of scouring the internet for sustainable products. And Ecofreaky is just that.",
    designation: "Recycle Man Of India",
  },
];

const SectionClientSay: FC<SectionClientSayProps> = ({ className = "" }) => {
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");

  useEffect(() => {
    const OPTIONS: Glide.Options = {
      perView: 1,
    };

    let slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
    slider.mount();
    // @ts-ignore
    return () => slider.destroy();
  }, [UNIQUE_CLASS]);

  // const renderBg = () => {
  //   return (
  //     <div className="hidden md:block">
  //       <img className="absolute top-9 -left-20" src={clientSay1} alt="" />
  //       <img
  //         className="absolute bottom-[100px] right-full mr-40"
  //         src={clientSay2}
  //         alt=""
  //       />
  //       <img
  //         className="absolute top-full left-[140px]"
  //         src={clientSay3}
  //         alt=""
  //       />
  //       <img
  //         className="absolute -bottom-10 right-[140px]"
  //         src={clientSay4}
  //         alt=""
  //       />
  //       <img
  //         className="absolute left-full ml-32 bottom-[80px]"
  //         src={clientSay5}
  //         alt=""
  //       />
  //       <img className="absolute -right-10 top-10 " src={clientSay6} alt="" />
  //     </div>
  //   );
  // };

  return (
    <div
      className={`nc-SectionClientSay relative flow-root ${className} `}
      data-nc-id="SectionClientSay"
    >

      <Heading desc="Let's see what people think of EcoFreaky" isCenter>
        Good news from far away 🥇
      </Heading>

      <div className="relative md:mb-16 max-w-2xl mx-auto">

        <div className={`mt-12 lg:mt-16 relative ${UNIQUE_CLASS}`}>
                  
          <div className="glide__track " data-glide-el="track">
            <ul className="glide__slides ">
              {DEMO_DATA.map((item) => (
                <li
                  key={item.id}
                  className="glide__slide flex flex-col items-center text-center"
                > 
                  <img className="mx-auto mb-8 rounded-sm" 
                   src={item.image} 
                   width={100}
                   height={100}
                   alt="" 
                  />

                  <span className="block text-2xl">{item.content}</span>
                  <span className="block mt-8 text-2xl font-semibold">
                    {item.clientName}
                  </span>
                  <div className="flex items-center space-x-0.5 mt-3.5 text-yellow-500">
                    {item.designation}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Index */}
          <div
            className="mt-10 glide__bullets flex items-center justify-center"
            data-glide-el="controls[nav]"
          >
            {DEMO_DATA.map((item, index) => (
              <button
                key={item.id}
                className="glide__bullet w-2 h-2 rounded-full bg-neutral-300 mx-1 focus:outline-none"
                data-glide-dir={`=${index}`}
                aria-label={`ClientSay Slide ${index}`}
              ></button>
            ))}
          </div>

        </div>
      </div>


    </div>
  );
};

export default SectionClientSay;
