import Link from "next/link";
import { Breadcomb, Button, Header, Layout } from "../../../../components";
import { getSubtopicNotes } from "../../../../api/note";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { validToken } from "../../../../api/auth";

export default function NotePage({ note, topic_id, subtopic_id }) {
  const [loading, setLoading] = useState(true);

  //route protection
  useEffect(() => {
    !validToken() ? router.push("/") : setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <Layout>
      <Breadcomb />
      <Header text="" />

      <div className="absolute top-24 md:top-10 md:right-36">
        <Link passHref href={`/learn/quiz/${subtopic_id}`}>
          <a>
            <Button name="Take quiz" />
          </a>
        </Link>
      </div>
      <div className="bg-shade-light p-5 rounded-lg flex flex-col max-h-[calc(80vh)] max-w-6xl prose-lg ">
        <div dangerouslySetInnerHTML={{ __html: note }} className="overflow-auto" />
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ req: { cookies }, params }) => {
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

  let { status, data: note } = await getSubtopicNotes(cookies.token, params.subtopic_id);
  if (status !== 200) note = null;
  return {
    props: {
      note: note[0].notes,
      topic_id: cookies.topic_id,
      subtopic_id: params.subtopic_id,
    },
  };
};
