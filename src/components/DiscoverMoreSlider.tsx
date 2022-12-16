import React, { useEffect, useId, useState } from "react";
import Heading from "./Heading/Heading";
import img1 from "images/collections/1.png";
import img2 from "images/collections/5.png";
import img3 from "images/collections/4.png";
import img4 from "images/collections/3.png";
import CardCategory3, {
  CardCategory3Props,
} from "./CardCategories/CardCategory3";
import Glide from "@glidejs/glide";

import { useGetAllCategoryQuery } from "features/category/categoryApiSlice";


interface CardCategory {
  className?: string;
  id: string;
  image?: any;
  name?: string;
  description?: string;
  color?: string;
  slug?: string;
}

const colors = [
  'bg-yellow-50',
  'bg-red-50',
  'bg-blue-50',
  'bg-green-50',
  'bg-pink-50',
  'bg-purple-50',
  'bg-emerald-50',
  'bg-sky-50',
]

// export const CATS_DISCOVER: CardCategory3Props[] = [
//   {
//     name: "Explore new arrivals",
//     desc: "Shop the latest <br /> from top brands",
//     featuredImage: img1,
//     color: "bg-yellow-50",
//   },
//   {
//     name: "Digital gift cards",
//     desc: "Give the gift <br /> of choice",
//     featuredImage: img2,
//     color: "bg-red-50",
//   },
//   {
//     name: "Sale collection",
//     desc: "Up to <br /> 80% off retail",
//     featuredImage: img3,
//     color: "bg-blue-50",
//   },
//   {
//     name: "Sale collection",
//     desc: "Up to <br /> 80% off retail",
//     featuredImage: img4,
//     color: "bg-green-50",
//   },
// ];

const DiscoverMoreSlider = () => {
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");

  const {data:categoriesArray, isLoading, isSuccess, isError, error} = useGetAllCategoryQuery();

  let content 

  if(isLoading){
    content = ''
  }else if(isSuccess){
    content = (
      <ul className="glide__slides">
        { isSuccess && categoriesArray?.map((item:any, index:number) => (
          <li key={index} className={`glide__slide`}>
            <CardCategory3
              name={item?.name}
              id={item?.id}
              description={item?.description}
              featuredImage={item?.image?.src}
              color={colors[index]}
              slug={item?.slug}
            />
          </li>
        ))}
      </ul>
    )
  }else if(isError){
    content = (
      <div>{"Please wait it error"}</div>
    )
  }
  
  useEffect(() => {
    const OPTIONS: Glide.Options = {
      perView: 2.8,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          gap: 28,
          perView: 2.5,
        },
        1279: {
          gap: 20,
          perView: 2.15,
        },
        1023: {
          gap: 20,
          perView: 1.6,
        },
        768: {
          gap: 20,
          perView: 1.2,
        },
        500: {
          gap: 20,
          perView: 1,
        },
      },
    };

    let slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
    slider.mount();
    // @ts-ignore
    return () => slider.destroy();
  }, [UNIQUE_CLASS]);

  return (
    <div className={`nc-DiscoverMoreSlider nc-p-l-container ${UNIQUE_CLASS} `}>
      <Heading
        className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50 nc-p-r-container "
        desc=""
        rightDescText="Good things are waiting for you"
        hasNextPrev
      >
        Discover more
      </Heading>
      <div className="" data-glide-el="track">
        {content}
      </div>
    </div>
  );
};

export default DiscoverMoreSlider;
