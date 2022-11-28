import Link from "next/link";
import { Breadcomb, Button, Header, Layout } from "../../../components";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { validToken } from "../../../api/auth";
import { useRouter } from "next/router";
import { getSubtopics } from "../../../api/subtopics";

export default function NotesPage({ Subtopics}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const recommendedTopics = useSelector((state) => state.recommendation.recommendations);
  const subtopics = useSelector((state) => state.subtopics.subtopics);

  const invalid = recommendedTopics?.map((el) => el.id);

  const otherTopics = subtopics?.filter((el) => !invalid?.includes(el.id));

  const setTopic = (id) => {
    Cookies.set("subtopic_id", id);
  };

  useEffect(() => {
    !validToken() ? router.push("/") : setLoading(false);
  }, []);

  if(loading) {
    return null;
  }
  if(!subtopics){
    return (
      <Layout>
        <Breadcomb />

        <div className="mb-5">

          {Subtopics && Subtopics.length > 0 && (
            <div className="mt-16">
              <Header text="Choose a subtopic you like:" />

              <div className="grid grid-cols-1 md:grid-cols-3 max-w-6xl items-center gap-4 md:gap-7 flex-wrap mt-5">
                {Subtopics.map((ot) => (
                  <Link passHref href={`/learn/notes/subtopic/${ot.id}`} key={ot.id.toString()}>
                    <div className="relative">
                      {ot.done && (
                        <div className="absolute -top-5 -right-2 h-10 w-10">
                          {/* <GreenTick /> */}
                        </div>
                      )}
                      <Button
                        name={ot.subtopic_name}
                        onClick={() => setTopic(ot.id)}
                        type="SECONDARY"
                        className="text-shade-dark hover:bg-primary-700/90 hover:text-shade-light border-primary-700 w-full"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </Layout>
  );
  }

  return (
    <Layout>
      <Breadcomb />

      <div className="mb-5">
        <div>
          <Header text="You can choose our recommendations:" />

          <div className="grid grid-cols-1 md:grid-cols-3 max-w-6xl items-center gap-4 md:gap-7 flex-wrap mt-5">
            {recommendedTopics?.map((rt, index) => (
              <Link passHref href={`/learn/notes/subtopic/${rt.id.toString()}`} key={index}>
                <div className="relative">
                  {rt.done && (
                    <div className="absolute -top-5 -right-2 h-10 w-10">{/* <GreenTick /> */}</div>
                  )}
                  <Button
                    name={rt.subtopic_name}
                    onClick={() => setTopic(rt.id)}
                    type="SECONDARY"
                    className="text-shade-dark hover:bg-primary-700/90 hover:text-shade-light border-primary-700 w-full"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {otherTopics && otherTopics.length > 0 && (
          <div className="mt-16">
            <Header text="Or choose a subtopic you like:" />

            <div className="grid grid-cols-1 md:grid-cols-3 max-w-6xl items-center gap-4 md:gap-7 flex-wrap mt-5">
              {otherTopics.map((ot) => (
                <Link passHref href={`/learn/notes/subtopic/${ot.id}`} key={ot.id.toString()}>
                  <div className="relative">
                    {ot.done && (
                      <div className="absolute -top-5 -right-2 h-10 w-10">
                        {/* <GreenTick /> */}
                      </div>
                    )}
                    <Button
                      name={ot.subtopic_name}
                      onClick={() => setTopic(ot.id)}
                      type="SECONDARY"
                      className="text-shade-dark hover:bg-primary-700/90 hover:text-shade-light border-primary-700 w-full"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ req: { cookies }, query }) => {
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

  const res1 = await getSubtopics(cookies.topic_id, cookies.token);

  const Subtopics = await res1.data;

  return {
    props: {
      Subtopics: Subtopics,
    },
  };
};
