import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { ChevronLeft } from "../assets";

export default function Breadcomb() {
  const { asPath } = useRouter();
  let paths = asPath;
  paths = paths.split("/").reverse();
  paths.pop();
  paths.reverse();
  const subject_name = Cookies.get("subject_name");
  const topic_name = Cookies.get("topic_name");

  if (paths.length === 1) {
    const name =
      topic_name[0].toUpperCase() +
      topic_name.substring(1).replace(/%3A/g, ": ").replace(/_/g, " ");
    const subject =
      subject_name[0].toUpperCase() +
      subject_name.substring(1).replace(/%3A/g, ": ").replace(/_/g, " ");
    return (
      <div className="flex text-neutral-500 text-lg">
        <Link href={`/learn/${subject}`}>
          <a>
            <div className="flex ml-1 first:ml-0 items-center cursor-pointer hover:text-primary-600">
              <p className={`text-primary-600`}>{subject} </p>
              <div>
                <ChevronLeft className="stroke-current rotate-180 stroke-[1.5] h-6" />
              </div>
              <p className={`text-primary-600`}>{name} </p>
            </div>
          </a>
        </Link>
      </div>
    );
  }
  return (
    <div className="flex text-neutral-500 text-lg">
      {paths.map((p, i) => {
        //get dynamic paths for the breadcombs
        let href = "/";
        for (let j = 0; j <= i; j++) {
          href = href + paths[j] + "/";
        }
        const hasNumber = /\d/;
        if (hasNumber.test(p)) {
          // console.log("here");
          const name =
            topic_name[0].toUpperCase() +
            topic_name.substring(1).replace(/%3A/g, ": ").replace(/_/g, " ");
          const subject =
            subject_name[0].toUpperCase() +
            subject_name.substring(1).replace(/%3A/g, ": ").replace(/_/g, " ");
          return (
            <Link href={`/learn/${subject}`} passHref key={i}>
              <a>
                <div className="flex ml-1 first:ml-0 items-center cursor-pointer hover:text-primary-600">
                  <p className={`${paths.length - 1 === i ? "text-primary-600" : ""}`}>{name} </p>
                  <div>
                    <ChevronLeft className="stroke-current rotate-180 stroke-[1.5] h-6" />
                  </div>
                </div>
              </a>
            </Link>
          );
        } else {
          return (
            <Link href={href} passHref key={i}>
              <a>
                <div className="flex ml-1 first:ml-0 items-center cursor-pointer hover:text-primary-600">
                  <p className={`${paths.length - 1 === i ? "text-primary-600" : ""}`}>
                    {p[0].toUpperCase() + p.substring(1).replace(/%3A/g, ": ").replace(/_/g, " ")}{" "}
                  </p>
                  <div>
                    <ChevronLeft className="stroke-current rotate-180 stroke-[1.5] h-6" />
                  </div>
                </div>
              </a>
            </Link>
          );
        }
      })}
    </div>
  );
}
