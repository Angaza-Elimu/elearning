import Link from "next/link";
import { Layout, LearnCard, Header } from "../../components";

export default function LearnPage() {
  const subjects = [
    { id: 1, name: "Math", percentage: 0 },
    { id: 2, name: "English", percentage: 0 },
    { id: 3, name: "Swahili", percentage: 0 },
    { id: 4, name: "Science", percentage: 0 },
    { id: 5, name: "Social Studies", percentage: 0 },
    { id: 6, name: "CRE", percentage: 0 },
  ];

  return (
    <Layout title="Pick a subject">
      <div className="my-auto lg:mt-14">
        <Header text="Now, pick a subject" />

        <div className="max-w-7xl w-full mr-auto mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-16">
            {subjects.map(({ name, id, percentage }) => (
              <Link
                href={{
                  pathname: "/learn/[subject]",
                  query: { subject: name.toLowerCase() },
                }}
                key={id.toString()}
                passHref
              >
                <a>
                  <LearnCard title={name} subtitle={percentage} />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ req, params }) => {
  return {
    props: {},
  };
};
