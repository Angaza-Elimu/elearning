import Image from "next/image";

import { Title, GradeCard } from "../components";
import logo from "../public/logo.svg";

export default function WelcomePage() {
  return (
    <>
      <Title name="Welcome" />

      <div className="bg-neutral-900">
        <div className="flex h-screen w-screen relative p-5 max-w-7xl mx-auto items-center justify-center ">
          <div className="h-14 w-14 fixed left-10 top-10">
            <Image src={logo} />
          </div>

          <div className="flex flex-col w-2/3 h-2/3">
            <div className="text-center">
              <h3 className="font-bold text-3xl">Welcome Alice</h3>
              <p className="font-semibold text-xl">Choose a grade to start learning with us</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 mt-10 gap-10">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item, i) => (
                <GradeCard item={item} key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
