import _ from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { validToken } from "../../../api/auth";
import { getSubjectsApi } from "../../../api/subjects";
import { getTopics } from "../../../api/topics";
import { Breadcomb, Header, Layout, LearnCard } from "../../../components";

export default function RevisionTopicPage({ topics, subject }) {
  const [loading, setLoading] = useState(true);
  const { query } = useRouter();

  //route protection
  useEffect(() => {
    !validToken() ? router.push("/") : setLoading(false);
  }, []);

  return loading ? null : (
    <Layout title={`Pick a topic in ${subject.subject_name}`}>
      <div>
        {/* <Breadcomb /> */}

        <Header text={`Now choose a topic in ${subject.subject_name}...`} className="mt-3" />

        <div className="max-w-7xl w-full mr-auto my-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-10">
            {_.orderBy(topics, "topic_name").map(({ id, topic_name, percentage = 0 }) => (
              <Link
                href={{
                  pathname: "/revision/quiz",
                  query: {
                    // topic: topic_name.replace(/[^a-zA-Z0-9?.:]/g, "_"),
                    subject_id: query.subject_id,
                    topic_id: id,
                  },
                }}
                key={id.toString()}
                passHref
              >
                <a>
                  <LearnCard
                    title={topic_name}
                    subtitle={percentage}
                    hasNoIcon
                    footerText="revising"
                    isPercentage={false}
                  />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ req: { cookies }, query }) => {
  const class_id = JSON.parse(JSON.parse(cookies["persist%3Aroot"]).grade)?.grade.id;

  let { status, data: topics } = await getTopics(class_id, query.subject_id, cookies.token);
  let { data: subject } = await getSubjectsApi(cookies.token);

  subject = subject.find((s) => s.id.toString() === query.subject_id);

  if (status !== 200) topics = [];

  return {
    props: { topics, subject },
  };
};
