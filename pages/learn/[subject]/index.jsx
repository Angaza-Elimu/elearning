import Link from "next/link";
import { useRouter } from "next/router";
import { getPrimaryTopics, getTopics } from "../../../api/topics";
import Cookies from "js-cookie";
import { Breadcomb, Header, Layout, LearnCard } from "../../../components";
import { useEffect, useState } from "react";
import { validToken } from "../../../api/auth";

export default function PickASubjectPage({ topics }) {
  const { query, push } = useRouter();
  const [loading, setLoading] = useState(true);
  const setTopic = (id, name) => {
    Cookies.set("topic_id", id);
    Cookies.set("topic_name", name);
    Cookies.set("subject_name", query.subject);
  };

  useEffect(() => {
    !validToken() ? push("/") : setLoading(false);
  }, []);

  return loading ? null : (
    <Layout title={`Pick a ${query.subject} Topic`}>
      <div>
        <Breadcomb />

        <Header
          text={`Nice! Now choose a topic in ${query.subject?.replace(/_/g, " ")} you love...`}
          className="mt-3"
        />

        <div className="max-w-7xl w-full mr-auto my-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10">
            {topics.map(({ id, topic_name, percentage = 0 }) => (
              <Link
                href={{
                  pathname: "/learn/[subject]/[topic]",
                  query: {
                    topic: topic_name.replace(/[^a-zA-Z0-9?.:]/g, "_"),
                    subject: query.subject,
                  },
                }}
                key={id.toString()}
                passHref
              >
                <a onClick={() => setTopic(id, topic_name)}>
                  <LearnCard title={topic_name} subtitle={percentage} hasNoIcon />
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
  if (
    cookies["persist%3Aroot"] === undefined ||
    !JSON.parse(JSON.parse(cookies["persist%3Aroot"]).grade)?.grade
  ) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const grade = JSON.parse(JSON.parse(cookies["persist%3Aroot"]).grade)?.grade;

  let statusGlobal, topics;

  let { status, data: _topics } = await getTopics(grade.id, cookies.subject_id, cookies.token);
  statusGlobal = status;
  topics = _topics;

  if (statusGlobal !== 200) topics = [];

  return {
    props: { topics },
  };
};
