import { Breadcomb, Button, Header, Layout } from "../components";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { validToken } from "../api/auth";

export default function Page40() {
  const [loading, setLoading] = useState(true);
  const score = useSelector((state) => state.quiz.score);
  const profile = useSelector((state) => state.profile.profile);
  const topic_id = Cookies.get("topic_id");
  const subtopic_id = Cookies.get("subtopic_id");
  const router = useRouter();

  useEffect(() => {
    !validToken() ? router.push("/") : setLoading(false);
  }, []);

  return loading ? null : (
    <Layout>
      <Breadcomb />

      <Header text={`You can do better ${profile.firstname}`} />

      <div className="p-6 py-8 rounded-lg bg-shade-light w-full flex flex-col items-center gap-10 flex-1 mb-10">
        <h2 className="font-bold text-center text-2xl my-6">Quiz outcome</h2>

        <div className="flex flex-wrap flex-[2] items-center gap-8 w-2/3 justify-evenly">
          <div className="flex flex-col items-center gap-4 ">
            <p className="text-6xl font-black text-alerts-info">{score.correctAnswer}</p>
            <p className="font-normal">Correctly answered</p>
          </div>
          <div className="flex flex-col items-center gap-4 ">
            <p className="text-6xl font-black text-alerts-warning">{score.wrongAnswer}</p>
            <p className="font-normal">Wrongly answered</p>
          </div>
          <div className="flex flex-col items-center gap-4 ">
            <p className="text-6xl font-black text-alerts-success">{score.totalScore}%</p>
            <p className="font-normal">Overall score</p>
          </div>
        </div>

        <div className="text-lg mx-auto space-y-4 w-full flex flex-col items-center flex-1">
          <Button
            name="Continue to next subtopic"
            onClick={() => router.push(`/learn/topics/${topic_id}`)}
          />

          <p>
            Want to try again?{" "}
            <span
              className="text-xl font-semi cursor-pointer text-primary-700 hover:underline"
              onClick={() => router.push(`/learn/quiz/${subtopic_id}`)}
            >
              Retake quiz
            </span>
          </p>
        </div>
      </div>
    </Layout>
  );
}
