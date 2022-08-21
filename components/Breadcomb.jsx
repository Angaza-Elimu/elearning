import Link from "next/link";

import { useRouter } from "next/router";
import { ChevronLeft } from "../assets";

export default function Breadcomb() {
  const { asPath } = useRouter();
  let paths = asPath;
  paths = paths.split("/").reverse();
  paths.pop();
  paths.reverse();

  return (
    <div className="flex text-neutral-500 text-lg">
      {paths.map((p, i) => {
        //get dynamic paths for the breadcombs
        let href = "/";
        for (let j = 0; j <= i; j++) {
          href = href + paths[j] + "/";
        }

        return (
          <Link href={href} passHref key={i}>
            <a>
              <div className="flex ml-1 first:ml-0 items-center cursor-pointer hover:text-primary-600">
                <p className={`${paths.length - 1 === i ? "text-primary-600" : ""}`}>
                  {p[0].toUpperCase() + p.substring(1)}{" "}
                </p>
                <div>
                  <ChevronLeft className="stroke-current rotate-180 stroke-[1.5] h-6" />
                </div>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
}
