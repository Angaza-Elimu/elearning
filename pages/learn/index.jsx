import Link from "next/link";
import _ from "lodash";
import Router, { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { getSubjectsApi } from "../../api/subjects";
import { Layout, LearnCard, Header } from "../../components";
import { validToken } from "../../api/auth";
import Cookies from "js-cookie";

export default function LearnPage({ subjects }) {
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const learning_system = useSelector((state) => state.profile.profile?.learning_system);

  //todo: add the percentage complete to the subjects
  let filtered_subjects = subjects.filter((s) => s.learning_level === learning_system);
  filtered_subjects = _.orderBy(filtered_subjects, ["subject_name"], "asc");

  //route protection
  useEffect(() => {
    !validToken() ? router.push("/") : setLoading(false);
  }, []);

  return loading ? null : (
    <Layout title="Pick a subject">
      <div className="my-auto lg:mt-14">
        <Header text="Now, pick a subject" />

        <div className="max-w-7xl w-full mr-auto md:my-12 my-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-16">
            {filtered_subjects.map(({ subject_name, id, percentage = 0 }) => (
              <Link
                href={{
                  pathname: "/learn/[subject]",
                  query: {
                    subject: subject_name.replace(/[^a-zA-Z0-9?.:]/g, "_"),
                  },
                }}
                key={id.toString()}
                passHref
              >
                <a onClick={() => Cookies.set("subject_id", id)}>
                  <LearnCard title={subject_name} subtitle={percentage} />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ req: { cookies } }) => {
  let { data: subjects, status } = await getSubjectsApi(cookies.token);

  if (status !== 200) subjects = [];

  return {
    props: { subjects },
  };
};
