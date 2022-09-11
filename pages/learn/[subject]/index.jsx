import Link from "next/link";
import { useRouter } from "next/router";

import { Breadcomb, Header, Layout, LearnCard } from "../../../components";

export default function PickASubjectPage({}) {
  const topics = [
    { id: 1, name: "Numbers", percentage: 0 },
    { id: 2, name: "Algebra", percentage: 0 },
    { id: 3, name: "Fractions", percentage: 0 },
    { id: 4, name: "Money", percentage: 0 },
    { id: 5, name: "Decimals", percentage: 0 },
    { id: 6, name: "Geometry", percentage: 0 },
    { id: 7, name: "Volume & mass", percentage: 0 },
    { id: 8, name: "Time, speed", percentage: 0 },
  ];
  const { query } = useRouter();

  return (
    <Layout title={`Pick a ${query.subject} Topic`}>
      <div>
        <Breadcomb />

        <Header text={`Nice! Now choose a ${query.subject} topic you love...`} className="mt-3" />

        <div className="max-w-7xl w-full mr-auto mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-10">
            {topics.map(({ id, name, percentage }) => (
              <Link
                href={{
                  pathname: "/learn/[subject]/[topic]",
                  query: { topic: name.toLowerCase(), subject: query.subject },
                }}
                key={id.toString()}
                passHref
              >
                <a>
                  <LearnCard title={name} subtitle={percentage} hasNoIcon />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
