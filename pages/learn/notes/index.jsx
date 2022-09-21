import Link from "next/link";
import { GreenTick } from "../../../assets";
import { Breadcomb, Button, Header, Layout } from "../../../components";

export default function NotesPage() {
  const recommendedTopics = [
    { id: 1, name: "Rounding off", done: false },
    { id: 2, name: "Square & square root", done: false },
  ];

  const otherTopics = [
    { id: 10, name: "Sequences", done: true },
    { id: 11, name: "Square & square root", done: true },
    { id: 12, name: "Combined operations", done: false },
    { id: 13, name: "Reading & writing numbers", done: false },
    { id: 14, name: "Subtopic", done: false },
    { id: 15, name: "Subtopic", done: false },
  ];

  return (
    <Layout>
      <Breadcomb />

      <div className="mb-5">
        <div>
          <Header text="You can choose our recommendations:" />

          <div className="grid grid-cols-3 max-w-6xl items-center gap-7 flex-wrap mt-5">
            {recommendedTopics.map((rt) => (
              <Link passHref href={`/learn/notes/${rt.id}`} key={rt.id.toString()}>
                <div className="relative">
                  {rt.done && (
                    <div className="absolute -top-5 -right-2 h-10 w-10">
                      <GreenTick />
                    </div>
                  )}
                  <Button
                    name={rt.name}
                    type="SECONDARY"
                    className="text-shade-dark hover:bg-primary-700/90 hover:text-shade-light border-primary-700 w-full"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <Header text="Or choose a subtopic you like:" />

          <div className="grid grid-cols-3 max-w-6xl items-center gap-7 flex-wrap mt-5">
            {otherTopics.map((ot) => (
              <Link passHref href={`/learn/notes/${ot.id}`} key={ot.id.toString()}>
                <div className="relative">
                  {ot.done && (
                    <div className="absolute -top-5 -right-2 h-10 w-10">
                      <GreenTick />
                    </div>
                  )}
                  <Button
                    name="Square & square root"
                    type="SECONDARY"
                    className="text-shade-dark hover:bg-primary-700/90 hover:text-shade-light border-primary-700 w-full"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
