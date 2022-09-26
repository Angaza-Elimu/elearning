import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { validToken } from "../../api/auth";
import { getOpenEndedRevisionQuestions } from "../../api/openEndedQuestions";
import { Button, Header, Layout, QuizCard } from "../../components";

export default function QuizPage({ questions }) {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const router = useRouter();

  const totalQuestion = questions.length;
  const [loading, setLoading] = useState(true);
  const { profile } = useSelector((state) => state.profile);

  const [correctlyAnswered, setCorrectlyAnswered] = useState(0);
  const [score, setScore] = useState(0);

  //route protection
  useEffect(() => {
    !validToken() ? router.push("/") : setLoading(false);
  }, []);

  return loading ? null : (
    <Layout title={`Revision Quiz`}>
      <>
        {!isQuizFinished ? (
          <QuizCard
            openEndedAnswers
            currentQuestion={currentQuestionIndex + 1}
            id={currentQuestionIndex}
            lastQuestion={currentQuestionIndex + 1 === totalQuestion}
            onNextQuestion={() =>
              setCurrentQuestionIndex((prev) => (prev < totalQuestion ? prev + 1 : prev))
            }
            onQuizFinished={() => setIsQuizFinished(true)}
            question={questions[currentQuestionIndex]?.question}
            totalQuestion={totalQuestion}
            correctAnswer={questions[currentQuestionIndex]?.answer}
          />
        ) : (
          <>
            <Header text={`You are progressing on well ${profile?.firstname}`} />

            <div className="p-6 py-8 rounded-lg bg-shade-light w-full flex flex-col items-center gap-10 flex-1 mb-10">
              <h2 className="font-bold text-center text-2xl my-6">Revision outcome</h2>

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
                  <span
                    className="text-xl font-semi cursor-pointer text-primary-700 hover:underline"
                    onClick={() => router.reload()}
                  >
                    Retake quiz
                  </span>
                </p>
              </div>
            </div>
          </>
        )}
      </>
    </Layout>
  );
}

export const getServerSideProps = async ({ req: { cookies }, query }) => {
  const { topic_id, subject_id } = query;

  if (!topic_id || !subject_id) {
    return {
      notFound: true,
    };
  }

  let { data: questions } = await getOpenEndedRevisionQuestions(cookies.token, topic_id);

  if (questions.length === 0) {
    return {
      redirect: {
        destination: "/revision",
        permanent: false,
      },
    };
  }

  questions = _.shuffle(questions).slice(0, 3); //selects 50 random questions

  return {
    props: { questions },
  };
};
