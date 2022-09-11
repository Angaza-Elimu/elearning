import { Breadcomb, Button, Header, Layout } from "../components";

export default function Page40() {
  return (
    <Layout>
      <Breadcomb />

      <Header text="You are progressing on well Alice" />

      <div className="p-6 py-8 rounded-lg bg-shade-light w-full flex flex-col items-center gap-10 flex-1 mb-10">
        <h2 className="font-bold text-center text-2xl my-6">Quiz outcome</h2>

        <div className="flex flex-wrap flex-[2] items-center gap-8 w-2/3 justify-evenly">
          <div className="flex flex-col items-center gap-4 ">
            <p className="text-6xl font-black text-alerts-info">14</p>
            <p className="font-normal">Correctly answered</p>
          </div>
          <div className="flex flex-col items-center gap-4 ">
            <p className="text-6xl font-black text-alerts-warning">6</p>
            <p className="font-normal">Wrongly answered</p>
          </div>
          <div className="flex flex-col items-center gap-4 ">
            <p className="text-6xl font-black text-alerts-success">70%</p>
            <p className="font-normal">Overall score</p>
          </div>
        </div>

        <div className="text-lg mx-auto space-y-4 w-full flex flex-col items-center flex-1">
          <Button name="Continue to next subtopic" />

          <p>
            Want to try again?{" "}
            <span className="text-xl font-semi cursor-pointer text-primary-700 hover:underline">
              Retake quiz
            </span>
          </p>
        </div>
      </div>
    </Layout>
  );
}
