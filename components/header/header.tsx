"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { t } from "@/i18n/i18n";

// components
import Link from "next/link";

// external components
import { MdClose, MdLocalMovies, MdMenu } from "react-icons/md";
import { Switch } from "@headlessui/react";

// utils
import { buttonsList } from "./utils";

// context
import { useLanguage } from "@/context/language-context/language-context";

function Header() {
  const { language, setLanguage } = useLanguage();
  const [enabled, setEnabled] = useState(false); // State to track the language switch
  const [open, setOpen] = useState<boolean>(false); // State to track the mobile menu open/close
  const [isVisible, setIsVisible] = useState<boolean>(true); // State to track header visibility
  const [lastScrollY, setLastScrollY] = useState<number>(0); // State to track scroll position

  const handleChange = (value: boolean) => {
    setEnabled(value);
    setLanguage(value ? "EN" : "ES"); // Update language based on switch value
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show the header when scrolling up, hide when scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false); // Hide header when scrolling down
      } else {
        setIsVisible(true); // Show header when scrolling up
      }

      setLastScrollY(currentScrollY); // Update last scroll position
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup scroll event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]); // Dependency to rerun on scroll position change

  return (
    <div
      className={twMerge(
        "w-full h-20 px-10 lg:px-32 py-6 bg-zinc-800 transition-transform duration-300 rounded-b-xl top-0 left-0 z-50 fixed",
        isVisible
          ? "transform translate-y-0 shadow-sm shadow-purple-600"
          : "transform -translate-y-full"
      )}
    >
      <div className="w-full flex flex-row justify-between items-center">
        <Link href="/">
          <MdLocalMovies className="w-6 h-6 text-purple-600 hover:shadow-lg cursor-pointer hover:shadow-purple-400" />
        </Link>
        <div className="hidden lg:flex flex-row gap-5 items-center">
          {buttonsList.map((item, index) => (
            <Link
              key={`buttonlist-lg-${+index}`}
              href={item.href}
              className="text-slate-200 font-medium uppercase text-sm"
            >
              {t(item.key, language)}
            </Link>
          ))}
          <div className="flex flex-row gap-2 items-center border-l-2 pl-4 border-l-purple-600">
            <img
              alt="ES"
              className="h-5 w-5 overflow-hidden rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRt3Sl5fzm1cRfdoG-Pngt6ixByHUuA4kuFjRkL6z_mRhFY_zxV3-7ZU25U_qDRxkyhz0&usqp=CAU"
            />
            <Switch
              checked={enabled}
              onChange={handleChange}
              className={`group inline-flex h-6 w-11 items-center rounded-full transition ${
                enabled ? "bg-purple-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`size-4 translate-x-1 rounded-full bg-white transition ${
                  enabled ? "translate-x-6" : ""
                }`}
              />
            </Switch>
            <img
              alt="EN"
              className="h-5 w-5 overflow-hidden rounded-full"
              src="https://img.freepik.com/foto-gratis/fondo-bandera-estados-unidos-america_23-2148157263.jpg?semt=ais_hybrid"
            />
          </div>
        </div>
        <MdMenu
          className="w-6 h-6 text-slate-200 hover:shadow-lg cursor-pointer block lg:hidden"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div
        className={twMerge(
          open ? "block" : "hidden",
          "lg:hidden w-screen h-screen bg-zinc-800 absolute top-0 left-0 bottom-0 right-0 p-10 z-50"
        )}
      >
        <div className="w-full flex flex-row justify-between items-center mb-10">
          <Link href="/">
            <MdLocalMovies className="w-6 h-6 text-purple-600 hover:shadow-lg cursor-pointer hover:shadow-purple-400" />
          </Link>
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-row gap-2 items-center border-r-2 pr-4 border-r-purple-600">
              <img
                alt="ES"
                className="h-5 w-5 overflow-hidden rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRt3Sl5fzm1cRfdoG-Pngt6ixByHUuA4kuFjRkL6z_mRhFY_zxV3-7ZU25U_qDRxkyhz0&usqp=CAU"
              />
              <Switch
                checked={enabled}
                onChange={handleChange}
                className={`group inline-flex h-6 w-11 items-center rounded-full transition ${
                  enabled ? "bg-purple-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`size-4 translate-x-1 rounded-full bg-white transition ${
                    enabled ? "translate-x-6" : ""
                  }`}
                />
              </Switch>
              <img
                alt="EN"
                className="h-5 w-5 overflow-hidden rounded-full"
                src="https://img.freepik.com/foto-gratis/fondo-bandera-estados-unidos-america_23-2148157263.jpg?semt=ais_hybrid"
              />
            </div>
            <MdClose
              className="w-6 h-6 text-slate-200 hover:shadow-lg cursor-pointer block lg:hidden"
              onClick={() => setOpen(!open)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          {buttonsList.map((item, index) => (
            <Link
              key={`buttonlist-lg-${+index}`}
              href={item.href}
              className="text-slate-200 font-medium uppercase text-sm"
              onClick={() => setOpen(!open)}
            >
              {t(item.key, language)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;
