import { SocialType } from "shared/SocialsShare/SocialsShare";
import React, { FC } from "react";
import facebook from "images/socials/facebook.svg";
import instagram from "images/socials/instagram.svg";
import linkedin from "images/socials/linkedin.svg";
import youtube from "images/socials/youtube.svg";

export interface SocialsListProps {
  className?: string;
  itemClass?: string;
  socials?: SocialType[];
}

const socialsDemo: SocialType[] = [
  { name: "Facebook", icon: facebook, href: "https://www.facebook.com/EcoFreaky" },
  { name: "Instagram", icon: instagram, href: "https://www.instagram.com/ecofreaky/" },
  { name: "Linkedin", icon: linkedin, href: "https://in.linkedin.com/company/ecofreaky" },
  { name: "Youtube", icon: youtube, href: "https://www.youtube.com/channel/UCkVypisBUrIxwn0IzF4mVsw" },
];

const SocialsList: FC<SocialsListProps> = ({
  className = "",
  itemClass = "block w-6 h-6",
  socials = socialsDemo,
}) => {
  return (
    <nav
      className={`nc-SocialsList flex space-x-2.5 text-2xl text-neutral-6000 dark:text-neutral-300 ${className}`}
      data-nc-id="SocialsList"
    >
      {socials.map((item, i) => (
        <a
          key={i}
          className={`${itemClass}`}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={item.name}
          aria-label={`EcoFreaky ${item.name} Link`}
        >
          <img src={item.icon} alt="" width={30}  height={30} />
        </a>
      ))}
    </nav>
  );
};

export default SocialsList;
