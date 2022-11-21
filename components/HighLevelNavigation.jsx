import Image from "next/image";
import Cookies from "js-cookie";
import Link from "next/link";
import teamSuccessImage from "../public/images/teamSuccess.svg";
import { Breadcomb, Layout } from "../components";

export default function HighLevelNavigation() {
  const subject_name = Cookies.get("subject_name");

  return (
    <Layout title="High Level Navigation">
      <Breadcomb />

      <div className="max-w-7xl mx-auto my-auto flex flex-1 h-full">
        <div className="flex flex-col flex-wrap flex-1 justify-evenly">
          <div className="relative h-48">
            <Image src={teamSuccessImage} alt="" layout="fill" />
          </div>

          {/* <div className="flex flex-col w-full mx-auto text-center">
            <div className="flex-1 justify-self-start">
              <h2 className="font-bold text-2xl">You're doing great.</h2>
              <p className="text-center text-lg mt-2 w-2/3 mx-auto">
                You are a Genius!!!.
              </p>
            </div>
          </div> */}

          <div className="text-center text-lg">
            <p>
              <Link  href="/learn/notes">
                <a >
                  <span className="text-primary-700 cursor-pointer hover:underline font-semibold">
                    Check out available lessons and more quizes in this topic.
                  </span>
                </a>
              </Link>
            </p>
          </div>

          <div className="text-center text-lg">
            <p>
              Not interested?{" "}
              <Link  href={`/learn/${subject_name}`}>
                <a >
                  <span className="text-primary-700 cursor-pointer hover:underline font-semibold">
                    Continue to another topic.
                  </span>
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
