import Image from "next/image";
import Link from "next/link";

import imageOf404 from "../public/images/404.png";
import { Title } from "../components";

export default function _404Page() {
  return (
    <>
      <Title name="404 page not found" />

      <div className="bg-neutral-900">
        <div className="flex h-screen justify-center items-center flex-col gap-6">
          <div className="relative h-48 aspect-video md:h-[459px] md:w-[583px]">
            <Image layout="fill" src={imageOf404} alt="" />
          </div>
          <div className="flex flex-col gap-6 mt-4 px-10">
            <p className="text-lg text-center">
              Sorry, we can't seem to locate the page you're looking for.
            </p>
            <Link href="/learn" replace>
              <button className="rounded-lg text-shade-light bg-primary-600 px-5 w-fit py-3 mx-auto text-lg transition-all duration-200 hover:scale-105 ease-out hover:shadow-md">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
