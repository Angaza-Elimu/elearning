import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import rectangle from "../public/images/Rectangle.svg";
import doubleRectangle from "../public/images/DoubleRectangle.svg";
import circles from "../public/images/Circles.svg";

import { Button, Input, Notification, Title } from "../components";
import { loginApi, loginWithToken, validToken } from "../api/auth";
import { useState, useEffect } from "react";
import { setToken, setProfile } from "../store/features/profileSlice";
import Link from "next/link";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [disableLoginButton, setDisableLoginButton] = useState(false);
  const grade = useSelector((state) => state.grade.grade);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    setDisableLoginButton(true);
    e.preventDefault();

    try {
      const { data, status } = await loginApi(username, password);

      if (status === 200) {
        loginWithToken(data.access_token);
        dispatch(setToken(data.access_token));
        dispatch(setProfile(data.user));

        if (!grade) return router.replace("/welcome");

        router.replace("/learn");
      } else {
        setDisableLoginButton(false);
        toast(<Notification type="danger" message={data.message} />);
      }
    } catch (error) {
      setDisableLoginButton(false);
      toast(<Notification type="error" message="Something went wrong, please try again." />);
    }
  };

  //redirects to learn if user is logged in
  useEffect(() => {
    validToken() ? router.push("/learn") : setLoading(false);
    // !grade ? router.push("/welcome") : router.push("/learn");

    // if (!validToken()) setLoading(false);
    // // if (validToken() && grade) return router.push("/welcome");

    // router.push("/learn");
  }, []);

  return loading ? null : (
    <>
      <Title name="Log In" />

      <div className="grid grid-cols-12 h-screen bg-[#FBFBFB]">
        <div className="md:col-span-5 md:flex items-center justify-center bg-primary-c9 text-shade-light relative hidden px-10">
          {/* <div className="h-12 w-12 absolute top-48 left-20">
            <Image src={doubleRectangle} layout="fill" />
          </div> */}
          <div className="flex flex-col mx-auto gap-5">
            <h2 className="font-bold text-5xl">Welcome back!</h2>

            <div className="w-3/5">
              <p>We love your consistency in learning with us. Sign in and keep studying.</p>
            </div>
          </div>
        </div>

        {/* login session */}
        <div className="col-span-full md:col-span-7 p-5 flex items-center relative">
          {/* <div className="h-12 w-12 absolute top-20 left-1/3">
            <Image src={rectangle} layout="fill" />
          </div> */}
          {/* <div className="h-20 w-32 absolute bottom-10 right-20">
            <Image src={circles} layout="fill" />
          </div> */}

          <div className="mx-auto w-full md:max-w-md">
            <p className="text-center mb-5 text-neutral-500">
              Don't have an account?{" "}
              <Link passHref href="/signup">
                <a>
                  <span className="text-primary-700 font-semibold cursor-pointer hover:underline">
                    Sign Up
                  </span>
                </a>
              </Link>
            </p>

            <div className="flex flex-col">
              <Input
                label="Username"
                name="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder="johndoe"
              />
              <Input
                label="Password"
                name="Password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                placeholder="● ● ● ● ● ● ●"
              />

              {/* <p className="text-sm text-primary-700 -mt-1 cursor-pointer hover:underline">
                Forgot Password?
              </p> */}

              <Button
                name="Log In"
                className="mt-3 text-shade-light flex justify-center items-center flex-row-reverse"
                onClick={handleLogin}
                loading={disableLoginButton}
                disabled={username.length === 0 || password.length === 0 || disableLoginButton}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
