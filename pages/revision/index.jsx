import Cookies from "js-cookie";
import _ from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { validToken } from "../../api/auth";
import { getSubjectsApi } from "../../api/subjects";
import { Header, Layout, LearnCard } from "../../components";

export default function RevisionPage({ subjects }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const learning_system = useSelector((state) => state.profile.profile?.learning_system);

  let filtered_subjects = subjects.filter((s) => s.learning_level === learning_system);
  filtered_subjects = _.orderBy(filtered_subjects, ["subject_name"], "asc");

  //route protection
  useEffect(() => {
    !validToken() ? router.push("/") : setLoading(false);
  }, []);

  return loading ? null : (
    <Layout title="Pick a subject">
      <div className="my-auto lg:mt-14">
        <Header text="Pick a subject to revise" />

        <div className="max-w-7xl w-full mr-auto my-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-16">
            {filtered_subjects.map(({ subject_name, id, percentage = 0 }) => (
              <Link
                href={{
                  pathname: "/revision/subjects/[subject_id]",
                  query: {
                    subject_id: id,
                  },
                }}
                key={id.toString()}
                passHref
              >
                <a onClick={() => Cookies.set("subject_id", id)}>
                  <LearnCard title={subject_name} subtitle={0} footerText="revising" />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ req: { cookies }, params }) => {
  let { data: subjects, status } = await getSubjectsApi(cookies.token);

  if (status !== 200) subjects = [];

  return {
    props: { subjects },
  };
};
