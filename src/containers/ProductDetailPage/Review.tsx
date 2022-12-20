import { useState } from "react";
import ReviewItem from "components/ReviewItem";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { StarIcon } from "@heroicons/react/24/solid";
import ModalViewAllReviews from "./ModalViewAllReviews";

const Review = () => {

    const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] =
    useState(false);

    const [isOpenModalCreateReviews, setIsOpenModalCreateReviews] =
    useState(false);

    return (
      <div className="">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold flex items-center">
          <StarIcon className="w-7 h-7 mb-0.5" />
          <span className="ml-1.5"> 4,87 · 142 Reviews</span>
        </h2>


        {/* comment */}
        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-11 gap-x-28">
            <ReviewItem />
            <ReviewItem
              data={{
                comment: `I love the charcoal heavyweight hoodie. Still looks new after plenty of washes. 
                  If you’re unsure which hoodie to pick.`,
                date: "December 22, 2021",
                name: "Stiven Hokinhs",
                starPoint: 5,
              }}
            />
            <ReviewItem
              data={{
                comment: `The quality and sizing mentioned were accurate and really happy with the purchase. Such a cozy and comfortable hoodie. 
                Now that it’s colder, my husband wears his all the time. I wear hoodies all the time. `,
                date: "August 15, 2022",
                name: "Gropishta keo",
                starPoint: 5,
              }}
            />
            <ReviewItem
              data={{
                comment: `Before buying this, I didn't really know how I would tell a "high quality" sweatshirt, but after opening, I was very impressed. 
                The material is super soft and comfortable and the sweatshirt also has a good weight to it.`,
                date: "December 12, 2022",
                name: "Dahon Stiven",
                starPoint: 5,
              }}
            />
          </div>

          <ButtonSecondary
            onClick={() => setIsOpenModalViewAllReviews(true)}
            className="mt-10 border border-slate-300 dark:border-slate-700 "
          >
            Show me all 142 reviews
          </ButtonSecondary>
        </div>

        {/* MODAL VIEW ALL REVIEW */}
        <ModalViewAllReviews
            show={isOpenModalViewAllReviews}
            onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
        />
        
      </div>
      
    );
  };

export default Review