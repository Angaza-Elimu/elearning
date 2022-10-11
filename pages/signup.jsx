import _ from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginWithToken, signUp, validToken } from "../api/auth";
import { ChevronLeft } from "../assets";
import { Button, Header, Input, Notification, Title } from "../components";
import classes from "../config/classes";
import logoWhite from "../public/images/logo-white.svg";
import { setGrade } from "../store/features/gradeSlice";
import { setProfile, setToken } from "../store/features/profileSlice";

export default function SignUpPage() {
  const [firstPage, setFirstPage] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const classList = classes();
  const [loading, setLoading] = useState(true);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [learning_system, setLearningSystem] = useState("");
  const [classId, setClassId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const handleCreateAccount = async () => {
    setSubmitting(true);
    const registrationData = {
      firstname,
      lastname,
      username,
      password,
      phone,
      email,
      user_type: "student",
      learning_system,
      class: classId,
    };

    try {
      const { data, status } = await signUp(registrationData);

      if (status === 201) {
        loginWithToken(data.login_data.access_token);
        dispatch(setToken(data.login_data.access_token));
        dispatch(setProfile(data.user));
        dispatch(setGrade(classId));
        router.replace("/welcome");
        return;
      }
      if (status === 422) {
        setSubmitting(false);
        throw new Error(_.toArray(data.error)[0]);
      } else {
        setSubmitting(false);
        throw new Error("Something went wrong try again.");
      }
    } catch (error) {
      setSubmitting(false);
      toast(<Notification message={error.message} type="info" />);
    }
  };

  //redirects to learn if user is logged in
  useEffect(() => {
    validToken() ? router.push("/learn") : setLoading(false);
  }, []);

  return loading ? null : (
    <>
      <Title name="Sign Up" />

      <div className="grid grid-cols-12 h-screen bg-primary-c9 md:bg-[#FBFBFB] relative">
        <div className="md:col-span-5 md:flex items-center justify-center bg-primary-700 text-shade-light relative hidden">
          <div className="h-16 w-16 absolute top-20 left-20">
            <Image src={logoWhite} layout="fill" />
          </div>
          <div className="flex flex-col mx-auto gap-5 justify-center w-2/3">
            <h2 className="font-bold text-5xl">Hi there ...</h2>

            <div className="text-base font-normal">
              <p>Welcome to the E-learning platform.</p>
              <p>We're so happy to have you join us.</p>
            </div>

            <div className="absolute bottom-10 w-3/5 text-base font-normal">
              <p>
                By creating an account, you are agreeing to our{" "}
                <span className="underline cursor-pointer hover:font-semibold duration-100 transition-all ease-linear">
                  terms of use
                </span>{" "}
                and{" "}
                <span className="underline cursor-pointer hover:font-semibold duration-100 transition-all ease-linear">
                  privacy policy
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* signup section */}
        {/* mobile view */}
        <div className="flex col-span-full mx-auto my-auto md:hidden">
          <div className="absolute top-4 left-4 h-10 w-10">
            <Image src={logoWhite} layout="fill" />
          </div>
          <div className="flex flex-col text-shade-light text-center">
            <h2 className="font-medium text-2xl">Hi there ...</h2>

            <div className="text-base font-light">
              <p>Welcome to the E-learning platform.</p>
              <p>We're so happy to have you join us.</p>
            </div>
          </div>
        </div>

        <div className="col-span-full md:col-span-7 p-5 flex items-center relative flex-col justify-between bg-[#FBFBFB] rounded-t-3xl gap-1 md:my-auto">
          <div className="mb-5 flex flex-col gap-1.5">
            <Header
              text={firstPage ? "Let's create your account" : "We're almost there"}
              className="text-[1.45em]"
            />

            <p className="text-center text-neutral-500 text-sm md:text-base">
              Already have an account?{" "}
              <Link passHref href="/">
                <a>
                  <span className="text-primary-700 font-semibold cursor-pointer hover:underline text-base">
                    Log In
                  </span>
                </a>
              </Link>
            </p>
          </div>

          <div className="mx-auto w-full md:max-w-md flex flex-col justify-start flex-1">
            {firstPage ? (
              <div className="flex flex-col gap-1 md:gap-4">
                <Input
                  label="First Name"
                  name="firstname"
                  placeholder="John"
                  onChange={(e) => setFirstname(e.target.value)}
                  value={firstname}
                  required
                />
                <Input
                  label="Last Name"
                  name="lastname"
                  placeholder="Doe"
                  onChange={(e) => setLastname(e.target.value)}
                  value={lastname}
                  required
                />
                <Input
                  label="Username"
                  name="username"
                  placeholder="johndoe"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                />

                <div className="border-2 border-neutral-800 rounded-md focus-within:border-primary-700 relative outline-none my-3">
                  <select
                    name="learning_system"
                    id="select_level"
                    className="block w-full focus:outline-none bg-transparent p-2 md:p-3 text-base text-shade-dark cursor-pointer"
                    value={learning_system}
                    onChange={(e) => setLearningSystem(e.target.value)}
                  >
                    <option value=""></option>
                    <option value="primary" className="text-shade-dark">
                      Primary
                    </option>
                    <option value="secondary" className="text-shade-dark">
                      Secondary
                    </option>
                  </select>
                  <label
                    htmlFor="select_level"
                    className="absolute top-2.5 left-3 duration-300 origin-0 bg-[#FBFBFB] md:text-lg text-neutral-500 font-medium px-1 select-none scale-90"
                  >
                    Select school level
                  </label>
                </div>

                <div className="border-2 border-neutral-800 rounded-md focus-within:border-primary-700 relative outline-none my-3">
                  <select
                    name="class"
                    id="class"
                    className="block w-full focus:outline-none bg-transparent p-2 md:p-3 text-base text-shade-dark cursor-pointer"
                    value={classId}
                    onChange={(e) => setClassId(e.target.value)}
                  >
                    <option value=""></option>
                    {classList
                      .filter((c) => c.learning_system === learning_system)
                      .map((c) => (
                        <option key={c.id} value={c.id} className="text-shade-dark">
                          {c.class_name}
                        </option>
                      ))}
                  </select>
                  <label
                    htmlFor="select_level"
                    className="absolute top-2.5 left-3 duration-300 origin-0 bg-[#FBFBFB] md:text-lg text-neutral-500 font-medium px-1 select-none scale-90"
                  >
                    Select class
                  </label>
                </div>

                <div className="w-full">
                  <Button
                    Component={() => (
                      <div className="flex flex-row items-center justify-center mx-auto gap-3">
                        <p>Next</p>
                        <ChevronLeft className="stroke-shade-light h-6 rotate-180 stroke-[1.5]" />
                      </div>
                    )}
                    className="mt-3 text-shade-light flex mx-auto items-center w-full"
                    onClick={() => {
                      setFirstPage(false);
                    }}
                    disabled={
                      firstname.length === 0 ||
                      lastname.length === 0 ||
                      username.length === 0 ||
                      learning_system.length === 0
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-1 md:gap-4">
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="example@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <Input
                  label="Phone Number"
                  name="phone_number"
                  placeholder="0700 xxxxxx"
                  type="tel"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <Input
                  label="Confirm Password"
                  name="confirm_password"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
                {/* handle password mismatch error */}
                {password.length > 0 &&
                  confirmPassword.length > 0 &&
                  password !== confirmPassword && (
                    <p className="text-alerts-danger text-sm -mt-3 md:-mt-6 pl-2">
                      password does not match
                    </p>
                  )}

                <div className="w-full">
                  <Button
                    name="Create my account"
                    className="mt-3 text-shade-light mx-auto w-full flex items-center flex-row-reverse justify-center"
                    onClick={handleCreateAccount}
                    loading={submitting}
                    disabled={
                      email.length === 0 ||
                      phone.length === 0 ||
                      password !== confirmPassword ||
                      submitting
                    }
                  />
                  <Button
                    name="Back"
                    type="SECONDARY"
                    className="mt-3 mx-auto w-full hover:!bg-primary-700/60 !text-primary-700 hover:!text-shade-light"
                    onClick={() => setFirstPage(true)}
                    disabled={submitting}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex md:hidden text-xs text-[#656E77] text-center mt-8">
            <p>
              By creating an account, you are agreeing to our{" "}
              <span className="underline cursor-pointer hover:font-semibold duration-100 transition-all ease-linear">
                terms of use
              </span>{" "}
              and{" "}
              <span className="underline cursor-pointer hover:font-semibold duration-100 transition-all ease-linear">
                privacy policy
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
