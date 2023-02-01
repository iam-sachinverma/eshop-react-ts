import React from "react";
import { Link } from "react-router-dom";
import logoImg from "images/logo.webp";
import logoLightImg from "images/logo.webp";

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  imgLight = logoLightImg,
  className = "flex-shrink-0",
}) => {
  return (
    <Link
      to="/"
      className={`ttnc-logo inline-block text-slate-600 ${className}`}
    >
      {/* THIS USE FOR MY CLIENT */}
      {/* PLEASE UN COMMENT BELLOW CODE AND USE IT */}
      {img ? (
        <img
          className={`block max-h-14 sm:max-h-20 ${
            imgLight ? "dark:hidden" : ""
          }`}
          src={img}
          alt="Logo"
          width={60}
          height={70}
        />
      ) : (
        "Logo Here"
      )}
      {imgLight && (
        <img
          className="hidden max-h-14 sm:max-h-20 dark:block"
          src={imgLight}
          alt="Logo-Light"
          width={60}
          height={70}
        />
      )}
    </Link>
  );
};

export default Logo;
