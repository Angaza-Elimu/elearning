import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import logo from "../public/logoWithName.svg";
import { Button, Modal } from ".";
import { ChevronLeft, Exit, Gear, HamburgerMenu, Minimize } from "../assets";
import navs from "../config/navs";
import { setGrade } from "../store/features/gradeSlice";
import { logout as logoutAction } from "../store/features/profileSlice";
import { getClassesApi } from "../api/classes";
import { getToken, logout, logoutApi } from "../api/auth";

export default function Sidebar({ onHide }) {
  const [visible, setVisible] = useState("");
  const [activeLink, setActiveLink] = useState();
  const [showGrades, setShowGrades] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const pathname = useRouter().pathname;
  const selectedGrade = useSelector((state) => state.grade.grade);
  const { profile } = useSelector((state) => state.profile);
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

  //get all classes based on the user's learning system
  useEffect(() => {
    (async function () {
      let { data: classes } = await getClassesApi(token);
      classes = classes.filter((grade) => grade.learning_system === profile?.learning_system);
      setGrades(classes);
    })();
  }, []);

  const handleLogout = () => {
    setOpenModal(false);
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
            name={selectedGrade?.class_name}
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
                      selectedGrade.id === id && "bg-primary-900 text-primary-500 shadow"
                    }`}
                    onClick={() => {
                      setShowGrades(false);
                      dispatch(setGrade({ class_name, id }));
                      router.reload();
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
                onClick={() => setOpenModal(true)}
              />
            </div>

            <div className="" onClick={() => onHide(true)}>
              <Minimize className="cursor-pointer stroke-neutral-500 hover:stroke-primary-600 transition-all duration-200 ease-out stroke-2 h-8 w-8" />
            </div>
          </div>
        </div>
      </nav>

      <Modal isOpen={openModal}>
        <div className="flex flex-col">
          <div className="flex flex-col justify-start gap-5 mb-5">
            <div className="relative mx-auto h-16 w-16">
              <Image src={"/images/hexagon.svg"} layout="fill" />
            </div>

            <h3 className="font-bold text-center text-primary-500">Log out</h3>
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-center text-neutral-500 text-sm">You're about to be logged out</p>

            <div className="flex items-center justify-between gap-5">
              <Button
                name="Cancel"
                type="SECONDARY"
                className="w-full py-1.5 !text-primary-700 hover:!text-shade-light"
                onClick={() => setOpenModal(false)}
              />
              <Button name="Confirm" className="w-full py-1.5" onClick={handleLogout} />
            </div>
          </div>
        </div>
      </Modal>

      {/* mobile navbar */}
      <div className="sticky w-full bg-shade-light shadow-md top-0 right-1 z-50 lg:hidden">
        <div className="relative flex flex-row items-center gap-5 pt-2 py-2.5 pr-2">
          {/* class dropdown */}
          <div className="ml-auto relative flex items-center gap-3">
            <Button
              className="w-full p-2 !py-1 flex gap-2 !pr-1"
              name={selectedGrade?.class_name}
              onClick={showGrades ? () => setShowGrades(false) : () => setShowGrades(true)}
              Component={() => (
                <ChevronLeft
                  className={`stroke-shade-light h-6 w-6 stroke-2 transition-all duration-300 -rotate-90 ${
                    showGrades ? "" : "rotate-180"
                  }`}
                />
              )}
            />
            {showGrades && (
              <div className="absolute top-11 w-44 overflow-hidden shadow-2xl rounded-lg">
                <div className="bg-shade-light flex flex-col gap-2 text-lg font-medium py-2 ">
                  {grades.map(({ class_name, id }) => (
                    <div
                      className={`p-2 px-8 cursor-pointer hover:bg-primary-700 hover:text-shade-light ${
                        selectedGrade.id === id && "bg-primary-900 text-primary-500 shadow"
                      }`}
                      onClick={() => {
                        setShowGrades(false);
                        dispatch(setGrade({ class_name, id }));
                        router.reload();
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

          <div
            className="h-12 w-12 relative cursor-pointer group"
            onClick={() => setOpenDropdown((prev) => !prev)}
          >
            <HamburgerMenu className="group-hover:stroke-primary-700 stroke-[#717A84]" />
          </div>

          {openDropdown && (
            <div className="flex flex-col absolute top-14 right-0 rounded-lg shadow-lg bg-shade-light overflow-hidden w-80">
              {Object.values(navs(profile?.learning_system)).map((nav, i) => (
                <Link href={nav.url} passHref key={i}>
                  <a
                    className={`p-2 py-3 hover:bg-primary-900 hover:text-primary-600 duration-200 transition-all ease-out text-lg relative ${
                      activeLink === nav.url && "bg-primary-900 text-primary-600 font-semibold"
                    }`}
                    onClick={() => setOpenDropdown(false)}
                  >
                    <div className="flex gap-4 justify-start pl-6 items-center ">
                      <p className="flex-1 text-lg">{nav.name}</p>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
