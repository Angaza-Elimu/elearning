import Link from "next/link";
import { GreenTick } from "../../../assets";
import { Breadcomb, Button, Header, Layout } from "../../../components";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

export default function NotesPage() {
  const recommendedTopics = useSelector((state) => state.recommendation.recommendations);

  const subtopics = useSelector((state) => state.subtopics.subtopics)


  const invalid = recommendedTopics.map((el) => el.id)

  const otherTopics = subtopics.filter((el) => !invalid.includes(el.id));

  const setTopic = (id) => {
    Cookies.set("subtopic_id", id)
  }

  return (
    <Layout>
      <Breadcomb />

      <div className="mb-5">
        <div>
          <Header text="You can choose our recommendations:" />

          <div className="grid grid-cols-3 max-w-6xl items-center gap-7 flex-wrap mt-5">
            {recommendedTopics.map((rt, index) => (
              <Link passHref href={`/learn/notes/${rt.id.toString()}`} key={index}>
                <div className="relative">
                  {rt.done && (
                    <div className="absolute -top-5 -right-2 h-10 w-10">
                      {/* <GreenTick /> */}
                    </div>
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

        {
          otherTopics.length > 0 && (
            <div className="mt-16">
              <Header text="Or choose a subtopic you like:" />

              <div className="grid grid-cols-3 max-w-6xl items-center gap-7 flex-wrap mt-5">
                {otherTopics.map((ot) => (
                  <Link passHref href={`/learn/notes/${ot.id}`} key={ot.id.toString()}>
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
          )
        }

      </div>
    </Layout>
  );
}
