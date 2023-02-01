import React, { FC, useState } from "react";

import imageRightPng from "images/hero-right.webp";
import imageRightPng2 from "images/hero-right-2.webp";
import imageRightPng3 from "images/hero-right-3.webp";

import desktopImg from "images/hero-right-desktop.webp"

import Next from "shared/NextPrev/Next";
import Prev from "shared/NextPrev/Prev";
import useInterval from "react-use/lib/useInterval";
import useBoolean from "react-use/lib/useBoolean";

import NcImage from "shared/NcImage/NcImage";

interface Hero2DataType {
  image: string;
  alt: string;
}

export interface SectionHero2Props {
  className?: string;
}

const DATA: Hero2DataType[] = [
  {
    image: imageRightPng2,
    alt: "body-care product category"
  },
  {
    image: imageRightPng3,
    alt: "eco-friendly recycled stationary"
  },
  {
    image: imageRightPng,
    alt: "bamboo products"
  },
  
];

let TIME_OUT: NodeJS.Timeout | null = null;

const SectionHero2: FC<SectionHero2Props> = ({ className = "" }) => {
  // =================
  const [indexActive, setIndexActive] = useState(0);
  const [isRunning, toggleIsRunning] = useBoolean(true);

  useInterval(
    () => {
      handleAutoNext();
    },
    isRunning ? 5500 : null
  );
  //

  const handleAutoNext = () => {
    setIndexActive((state) => {
      if (state >= DATA.length - 1) {
        return 0;
      }
      return state + 1;
    });
  };

  const handleClickNext = () => {
    setIndexActive((state) => {
      if (state >= DATA.length - 1) {
        return 0;
      }
      return state + 1;
    });
    handleAfterClick();
  };

  const handleClickPrev = () => {
    setIndexActive((state) => {
      if (state === 0) {
        return DATA.length - 1;
      }
      return state - 1;
    });
    handleAfterClick();
  };

  const handleAfterClick = () => {
    toggleIsRunning(false);
    if (TIME_OUT) {
      clearTimeout(TIME_OUT);
    }
    TIME_OUT = setTimeout(() => {
      toggleIsRunning(true);
    }, 1000);
  };
  // =================

  const renderItem = (index: number) => {
    const isActive = indexActive === index;
    const item = DATA[index];

    if (!isActive) {
      return null;
    }

    return (
      <div
        className={`nc-SectionHero2Item flex flex-col-reverse lg:flex-col relative overflow-hidden ${className}`}
        key={index}
      >

        <Prev
          className="absolute left-1 sm:left-5 top-1/4 sm:top-1/2 sm:-translate-y-1/2 z-10 !text-slate-700"
          btnClassName="w-12 h-12 hover:border-slate-400 dark:hover:border-slate-400"
          svgSize="w-6 h-6"
          onClickPrev={handleClickPrev}
        />
        <Next
          className="absolute right-1 sm:right-5 top-1/4 sm:top-1/2 sm:-translate-y-1/2 z-10 !text-slate-700"
          btnClassName="w-12 h-12 hover:border-slate-400 dark:hover:border-slate-400"
          svgSize="w-6 h-6"
          onClickNext={handleClickNext}
        />

        <div className="relative p-0">
          <NcImage className='w-full h-full object-contain object-center' src={item?.image} />
        </div>
      </div>
    );
  };

  return <>{DATA.map((_, index) => renderItem(index))}</>;
};

export default SectionHero2;
