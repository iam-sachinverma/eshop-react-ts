import React, { FC, useEffect, useId, useMemo } from "react";
import NextPrev from "shared/NextPrev/NextPrev";
import Glide from "@glidejs/glide";
import NcImage from "shared/NcImage/NcImage";

export interface PhotosProps {
  imgs: string[];
  initFocus?: number;
}

const Photos: FC<PhotosProps> = ({
    imgs,
    initFocus = 0,
  }) => {
        
    const id = useId();
    const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");

    let MY_GLIDEJS = useMemo(() => {
        return new Glide(`.${UNIQUE_CLASS}`, {
          // @ts-ignore
          direction:
            document.querySelector("html")?.getAttribute("dir") === "rtl"
              ? "rtl"
              : "ltr",
          gap: 10,
          perView: 1,
          startAt: initFocus,
        });
    }, [UNIQUE_CLASS, initFocus]);

    useEffect(() => {
        setTimeout(() => {
          MY_GLIDEJS.mount();
        }, 10);
    }, [MY_GLIDEJS, UNIQUE_CLASS]);

    const renderSlider = () => {
        return (
          <div
            className={`modalPhotos-single-gallery ${UNIQUE_CLASS} group relative flex flex-col w-full h-full`}
          >
            {/*  */}
            {/* <div
              className="controls_nav glide__bullets mb-4"
              data-glide-el="controls[nav]"
            >
              {imgs.map((_, index) => (
                <div key={index} className="text-center hidden text-sm">
                  <span className="text-xl font-semibold"> {index + 1}</span>
                  <span> / {imgs.length} </span>
                </div>
              ))}
            </div> */}
            {/*  */}
    
            <div
              className="glide__track max-h-full h-full relative z-50"
              data-glide-el="track"
            >
              <ul className="glide__slides h-full ">
                {imgs.map((item:any, index:number) => (
                  <li className="glide__slide relative h-full" key={index}>
                    <NcImage
                      src={item.src}
                      containerClassName=" w-full h-full flex items-center justify-center "
                      className=" max-w-full max-h-full rounded-2xl"
                    />
                  </li>
                ))}
              </ul>
            </div>
            {/*  */}
            <div className="z-20 max-w-6xl my-2 mx-auto top-full transform flex xl:justify-between glide__arrows">
              <NextPrev
                onlyPrev
                className="mr-1.5"
                btnClassName="w-8 h-8 sm:w-10 sm:h-10 "
              />
              <NextPrev
                onlyNext
                className="ml-1.5"
                btnClassName="w-8 h-8 sm:w-10 sm:h-10 "
              />
            </div>
          </div>
        );
    };

    return (
        <div className="w-full max-w-5xl py-5 sm:py-8 h-full align-middle mx-auto">
            {renderSlider()}
        </div>
    )

}

export default Photos;