import _ from "lodash";
import Link from "next/link";
import Cookies from "js-cookie";
import { Breadcomb, Header, Layout, LearnCard } from "../../../components";
import { getSubtopics } from "../../../api/subtopics";
import { useEffect, useState } from "react";
import { validToken } from "../../../api/auth";
import { useRouter } from "next/router";

export default function PickASubtopicPage({ subtopics }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    !validToken() ? router.push("/") : setLoading(false);
  }, []);

  return loading ? null : (
    <Layout title={`Pick a Subtopic`}>
      <div>
        <Breadcomb />

        <Header text={`Nice! Now choose a subtopic you love...`} className="mt-3" />

        <div className="max-w-7xl w-full mr-auto my-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10">
            {_.orderBy(subtopics, "topic_name").map(({ id, subtopic_name, percentage = 0 }) => (
              <Link href={`/learn/notes/subtopic/${id}`} key={id.toString()} passHref>
                <a onClick={() => Cookies.set("subtopic_id", id)}>
                  <LearnCard title={subtopic_name} subtitle={percentage} hasNoIcon />
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

  let { status, data: subtopics } = await getSubtopics(cookies.topic_id, cookies.token);
  if (status !== 200) subtopics = [];

  return {
    props: { subtopics },
  };
};
