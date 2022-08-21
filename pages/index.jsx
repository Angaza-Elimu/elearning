import Image from "next/image";
import { useRouter } from "next/router";

import { Button, Input, Title } from "../components";

import rectangle from "../public/images/Rectangle.svg";
import doubleRectangle from "../public/images/DoubleRectangle.svg";
import circles from "../public/images/Circles.svg";

export default function LoginPage() {
  const router = useRouter();

  return (
    <>
      <Title name="Log In" />

      <div className="grid grid-cols-12 h-screen bg-[#FBFBFB]">
        <div className="col-span-5 flex items-center justify-center radial text-shade-light relative">
          <div className="h-12 w-12 absolute top-48 left-20">
            <Image src={doubleRectangle} layout="fill" />
          </div>
          <div className="flex flex-col mx-auto gap-5">
            <h2 className="font-bold text-5xl">Log In</h2>

            <div className="font-medium">
              <p>Hello, welcome back!</p>
              <p className="font-normal">We're happy to see you again ...</p>
            </div>
          </div>
        </div>

        {/* login session */}
        <div className="col-span-7 p-5 flex items-center relative">
          <div className="h-12 w-12 absolute top-20 left-1/3">
            <Image src={rectangle} layout="fill" />
          </div>
          <div className="h-20 w-32 absolute bottom-10 right-20">
            <Image src={circles} layout="fill" />
          </div>

          <div className="w-2/5 ml-36">
            <p className="text-center mb-5 text-neutral-500">
              Don't have an account?{" "}
              <span className="text-primary-700 font-semibold cursor-pointer hover:underline">
                Sign Up
              </span>
            </p>

            <div className="flex flex-col">
              <Input label="Username" name="Username" />
              <Input label="Password" name="Password" />

              <p className="text-sm text-primary-700 -mt-1 cursor-pointer hover:underline">
                Forgot Password?
              </p>

              <Button
                name="Log In"
                className="mt-3 text-shade-light"
                onClick={() => router.push("welcome")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
