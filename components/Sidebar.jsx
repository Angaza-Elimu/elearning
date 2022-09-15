import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import logo from "../public/logoWithName.svg";
import { Button } from ".";
import { ChevronLeft, Exit, Gear, Minimize } from "../assets";
import navs from "../config/navs";
import { setGrade } from "../store/features/gradeSlice";
import { logout as logoutAction } from "../store/features/profileSlice";
import { getClassesApi } from "../api/classes";
import { getToken, logout, logoutApi } from "../api/auth";

export default function Sidebar({ onHide }) {
  const [visible, setVisible] = useState("");
  const [activeLink, setActiveLink] = useState();
  const [showGrades, setShowGrades] = useState(false);
  const pathname = useRouter().pathname;
  const selectedGrade = useSelector((state) => state.grade.grade);
  const profile = useSelector((state) => state.profile.profile);
  const [grades, setGrades] = useState([]);
  const token = getToken();

  const dispatch = useDispatch();
  const router = useRouter();

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

  //get all grades for select grade sidebar
  useEffect(() => {
    (async function () {
      const { data: grades } = await getClassesApi(token);
      setGrades(grades);
    })();
  }, []);

  const handleLogout = () => {
    try {
      logoutApi(token);
      logout();
      dispatch(logoutAction());

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="lg:flex flex-col h-full select-none lg:relative hidden absolute top-10 right-0 lg:top-0 lg:right-0">
        <div className="relative h-10 w-10/12 mx-auto mt-10">
          <Image src={logo} layout="fill" alt="logo" />
        </div>

        <div className="flex-1 w-full mx-auto text-neutral-500 text-lg font-medium gap-3 flex flex-col justify-start mt-10 transition-all duration-200 ease-in-out">
          {Object.values(navs(profile?.learning_system)).map((nav, i) => (
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

        <div className="w-4/6 mx-auto mb-5 relative">
          <Button
            className="w-full p-2"
            name={selectedGrade}
            onClick={showGrades ? () => setShowGrades(false) : () => setShowGrades(true)}
            Component={() => (
              <ChevronLeft
                className={`stroke-shade-light h-6 w-6 stroke-2 transition-all duration-300 ${
                  showGrades ? "" : "rotate-180"
                }`}
              />
            )}
          />
          {showGrades && (
            <div className="absolute -right-36 bottom-5 z-50 overflow-hidden shadow-2xl rounded-lg">
              <div className="bg-shade-light flex flex-col gap-2 text-lg font-medium py-2 ">
                {grades.map(({ class_name, id }) => (
                  <div
                    className={`p-2 px-8 cursor-pointer hover:bg-primary-700 hover:text-shade-light ${
                      selectedGrade === class_name && "bg-primary-900 text-primary-500 shadow"
                    }`}
                    onClick={() => {
                      setShowGrades(false);
                      dispatch(setGrade(class_name));
                    }}
                    key={id}
                  >
                    <p>{class_name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
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
              <Exit
                className="cursor-pointer stroke-neutral-500 hover:stroke-primary-600 transition-all duration-200 ease-out stroke-2 h-8 w-8"
                onClick={handleLogout}
              />
            </div>

            <div className="" onClick={() => onHide(true)}>
              <Minimize className="cursor-pointer stroke-neutral-500 hover:stroke-primary-600 transition-all duration-200 ease-out stroke-2 h-8 w-8" />
            </div>
          </div>
        </div>
      </nav>

      <div className="absolute top-5 right-0 z-50 w-full bg-alerts-success lg:hidden">
        hello world
      </div>
    </>
  );
}
