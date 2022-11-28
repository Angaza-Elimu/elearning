import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { ChevronLeft } from "../assets";

export default function BreadcombLearn({links}) {
  const { asPath } = useRouter();
  let paths = asPath;
  paths = paths.split("/").reverse();
  const subject_name = Cookies.get("subject_name");
  const topic_name = Cookies.get("topic_name");
  const path = links ? [...links,topic_name,subject_name,'learn',''] : [topic_name,subject_name,'learn',''];
  path.pop();
  path.reverse();

  return (
    <div className="flex text-neutral-500 text-lg">
      {path.map((p, i) => {
        //get dynamic paths for the breadcombs
        let href = "/";
        for (let j = 0; j <= i; j++) {
          href = href + path[j] + "/";
        }

        if(p === 'notes' || p === 'quiz') {
           href = `/learn/${p}`
        }
          return (
            <Link href={href} passHref key={i}>
              <a>
                <div className="flex ml-1 first:ml-0 items-center cursor-pointer hover:text-primary-600">
                  <p className={`${path.length - 1 === i ? "text-primary-600" : ""}`}>
                    {p[0].toUpperCase() + p.substring(1).replace(/%3A/g, ": ").replace(/_/g, " ")}{" "}
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
