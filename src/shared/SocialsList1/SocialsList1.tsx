import { SocialType } from "shared/SocialsShare/SocialsShare";
import React, { FC } from "react";
import facebook from "images/socials/facebook.svg";
import instagram from "images/socials/instagram.svg";
import linkedin from "images/socials/linkedin.svg";
import youtube from "images/socials/youtube.svg";

export interface SocialsList1Props {
  className?: string;
}

const socials: SocialType[] = [
  { name: "Facebook", icon: facebook, href: "https://www.facebook.com/EcoFreaky" },
  { name: "Instagram", icon: instagram, href: "https://www.instagram.com/ecofreaky/" },
  { name: "Linkedin", icon: linkedin, href: "https://in.linkedin.com/company/ecofreaky" },
  { name: "Youtube", icon: youtube, href: "https://www.youtube.com/channel/UCkVypisBUrIxwn0IzF4mVsw" },
];

const SocialsList1: FC<SocialsList1Props> = ({ className = "space-y-3" }) => {
  const renderItem = (item: SocialType, index: number) => {
    return (
      <a
        href={item.href}
        className="flex items-center text-2xl text-white dark:text-neutral-300 dark:hover:text-white leading-none space-x-2 group"
        key={index}
        aria-lable={`EcoFreaky ${item.name} Link`}
      >
        <div className="flex-shrink-0 w-6 mx-1">
          <img src={item.icon} alt="" width={30}  height={30} />
        </div>
        <span className="hidden lg:block text-sm">{item.name}</span>
      </a>
    );
  };

  return (
    <div className={`nc-SocialsList1 ${className}`} data-nc-id="SocialsList1">
      {socials.map(renderItem)}
    </div>
  );
};

export default SocialsList1;
