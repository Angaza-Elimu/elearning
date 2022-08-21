import { useEffect, useState } from "react";
import logo from "../public/logoWithName.svg";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { Button } from ".";
import { ChevronLeft, Exit, Gear, Minimize } from "../assets";

import navs from "../config/navs";

export default function Sidebar({ onHide }) {
  const [visible, setVisible] = useState("");
  const [activeLink, setActiveLink] = useState();
  const pathname = useRouter().pathname;

  const toggleVisibility = (name) => {
    setActiveLink("/" + name.toLowerCase());

    if (!visible) return setVisible(name);

    if (visible === name) return setVisible("");
    if (visible !== activeLink && visible === activeLink) return setVisible("");

    return setVisible(name);
  };

  useEffect(() => {
    if (pathname.split("/").length >= 2)
      toggleVisibility(
        pathname.split("/")[1].charAt(0).toUpperCase() + pathname.split("/")[1].substring(1)
      );
  }, []);

  return (
    <nav className="flex flex-col h-full select-none">
      <Link passHref href="/">
        <a className="mt-10 outline-none">
          <div className="relative h-10 w-10/12 mx-auto">
            <Image src={logo} layout="fill" alt="logo" />
          </div>
        </a>
      </Link>

      <div className="flex-1 w-full mx-auto text-neutral-500 text-lg font-medium gap-3 flex flex-col justify-start mt-10 transition-all duration-200 ease-in-out">
        {Object.values(navs).map((nav, i) => (
          <Link href={nav.url} passHref key={i}>
            <a
              className={`p-2 py-3 hover:bg-primary-900 hover:text-primary-600 duration-200 transition-all ease-out text-lg relative ${
                activeLink === nav.url && "bg-primary-900 text-primary-600 font-semibold"
              }`}
            >
              {activeLink === nav.url && (
                <div className="w-1.5 bg-primary-600 h-full absolute top-0 left-0"></div>
              )}
              <div className="flex gap-4 justify-start pl-6 items-center ">
                {nav.component && (
                  <nav.component className="stroke-current stroke-[1.5px] h-7 w-7" />
                )}
                <p className="flex-1 text-lg">{nav.name}</p>
              </div>
            </a>
          </Link>
        ))}
      </div>

      <div className="w-4/6 mx-auto mb-5">
        <Button
          className="w-full p-2"
          name="Grade 5"
          Component={() => (
            <ChevronLeft className="stroke-shade-light h-6 w-6 rotate-180 stroke-2" />
          )}
        />
      </div>

      <div className="border-t border-neutral-800 p-5 py-4">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <Link href="/settings" passHref>
              <a href="">
                <Gear
                  className={`cursor-pointer hover:stroke-primary-600 transition-all duration-200 ease-out stroke-2 h-8 w-8 ${
                    pathname.split("/")[1] === "settings"
                      ? "stroke-primary-600"
                      : "stroke-neutral-500"
                  }`}
                />
              </a>
            </Link>
            <Exit className="cursor-pointer stroke-neutral-500 hover:stroke-primary-600 transition-all duration-200 ease-out stroke-2 h-8 w-8" />
          </div>

          <div className="" onClick={() => onHide(true)}>
            <Minimize className="cursor-pointer stroke-neutral-500 hover:stroke-primary-600 transition-all duration-200 ease-out stroke-2 h-8 w-8" />
          </div>
        </div>
      </div>
    </nav>
  );
}
