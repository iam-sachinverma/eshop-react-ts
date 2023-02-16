import React, { FC } from "react";
import NcImage from "shared/NcImage/NcImage";
import { Link } from "react-router-dom";
import ButtonSecondary from "shared/Button/ButtonSecondary";
// import { CATS_DISCOVER } from "components/DiscoverMoreSlider";

export interface CardCategory3Props {
  className?: string;
  id?: string;
  featuredImage?: string;
  name?: string;
  description?: string;
  color?: string;
  slug?: string;
}

const CardCategory3: FC<CardCategory3Props> = ({
  className = "",
  id,
  featuredImage,
  name,
  description,
  color,
  slug,
}) => {
  return (
    <Link
      to={`products/${id}`}
      className={`nc-CardCategory3 block ${className}`}
      data-nc-id="CardCategory3"
    >
      <div
        className={`relative w-full aspect-w-16 aspect-h-11 sm:aspect-h-9 h-0 rounded-2xl overflow-hidden group ${color}`}
      >
        <div>
          <NcImage
            src={featuredImage}
            containerClassName="absolute inset-0"
            className="absolute h-full w-full object-cover drop-shadow-xl rounded-lg"
          />
        </div>

        <span className="opacity-0 group-hover:opacity-40 absolute inset-0 bg-black/10 transition-opacity"></span>

        <div>
          <div className="absolute inset-5 sm:inset-8 flex flex-col">
            <div className="mt-auto">
              <ButtonSecondary
                sizeClass="py-3 px-4 sm:py-3.5 sm:px-6"
                fontSize="text-md font-medium"
                className="nc-shadow-lg"
              >
                {name}
              </ButtonSecondary>
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
};

export default CardCategory3;
