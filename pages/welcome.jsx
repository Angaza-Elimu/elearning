import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { validToken } from "../api/auth";
import { getClassesApi } from "../api/classes";

import { Title, GradeCard } from "../components";
import logo from "../public/logo.svg";

export default function WelcomePage({ classes }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const profile = useSelector((state) => state.profile.profile);

  //route protection
  useEffect(() => {
    !validToken() ? router.push("/") : setLoading(false);
  }, []);

  return loading ? null : (
    <>
      <Title name="Welcome" />

      <div className="bg-neutral-900">
        <div className="flex h-screen w-screen relative p-5 max-w-7xl mx-auto items-center justify-center ">
          <div className="h-14 w-14 fixed left-10 top-10">
            <Image src={logo} />
          </div>

          <div className="flex flex-col w-2/3 h-2/3">
            <div className="text-center">
              <h3 className="font-bold text-3xl">
                Welcome {profile.firstname[0].toUpperCase() + profile.firstname.substring(1)}
              </h3>
              <p className="font-semibold text-xl">Choose a grade to start learning with us</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 mt-10 gap-10">
              {classes.map(({ class_name, id }) => (
                <GradeCard item={class_name} key={id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ req: { cookies } }) => {
  let { data: classes, status } = await getClassesApi(cookies.token);

  if (status !== 200) classes = [];

  return {
    props: { classes },
  };
};
