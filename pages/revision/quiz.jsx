import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { getToken, validToken } from "../../api/auth";
// import { getOpenEndedRevisionQuestions } from "../../api/openEndedQuestions";
import { answerRevisionQuestion, getRevisionQuestions } from "../../api/revision";
import { Button, Header, Layout, QuizCard } from "../../components";

export default function QuizPage({ questions }) {
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { query, ...router } = useRouter();

  const totalQuestion = questions.length;
  const [loading, setLoading] = useState(true);
  const { profile } = useSelector((state) => state.profile);

  const [correctlyAnswered, setCorrectlyAnswered] = useState(0);
  const [score, setScore] = useState(0);
  // const [providedAnswer, setProvidedAnswer] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [uniqueQuizId, setUniquedQuizId] = useState("");

  const answers = [
    questions[currentQuestionIndex]?.option_a,
    questions[currentQuestionIndex]?.option_b,
    questions[currentQuestionIndex]?.option_c,
    questions[currentQuestionIndex]?.option_d,
  ];

  const answerHints = [
    questions[currentQuestionIndex]?.option_a_explanation,
    questions[currentQuestionIndex]?.option_b_explanation,
    questions[currentQuestionIndex]?.option_c_explanation,
    questions[currentQuestionIndex]?.option_d_explanation,
  ];

  const handleNextQuestion = async () => {
    let answered = {
      student_id: "31303",
      topic_id: query.topic_id,
      subject_id: query.subject_id,
      answer: questions[currentQuestionIndex]?.answer,
      marked: 0,
      question_id: questions[currentQuestionIndex].id,
      quiz_id: uniqueQuizId,
    };

    setCurrentQuestionIndex((prev) => (prev < totalQuestion ? prev + 1 : prev));

    if (answers.indexOf(selectedAnswer) + 1 == questions[currentQuestionIndex]?.answer) {
      setCorrectlyAnswered((prev) => prev + 1);
      answered = { ...answered, marked: 1 };

      // console.log("next question", selectedAnswer, questions[currentQuestionIndex]?.answer);
      // console.log("answered", answered);
    }

    //call the answer api here to send the answer to the server
    const { data } = await answerRevisionQuestion(getToken(), answered);
  };

  const handleQuizFinished = () => {
    setIsQuizFinished(true);
    // console.log("quiz finished");
  };

  //route protection
  useEffect(() => {
    !validToken() ? router.push("/") : setLoading(false);
  }, []);

  useEffect(() => {
    setUniquedQuizId(uuidv4());
  }, []);

  console.log(uniqueQuizId);

  return loading ? null : (
    <Layout title={`Revision Quiz`}>
      <>
        {!isQuizFinished ? (
          // <QuizCard
          //   openEndedAnswers
          //   providedAnswer={providedAnswer}
          //   setProvidedAnswer={setProvidedAnswer}
          //   currentQuestion={currentQuestionIndex + 1}
          //   id={currentQuestionIndex}
          //   lastQuestion={currentQuestionIndex + 1 === totalQuestion}
          //   onNextQuestion={() => handleNextQuestion()}
          //   onQuizFinished={() => handleQuizFinished()}
          //   question={questions[currentQuestionIndex]?.question}
          //   totalQuestion={totalQuestion}
          //   correctAnswer={questions[currentQuestionIndex]?.answer}
          // />
          <QuizCard
            answers={answers}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            currentQuestion={currentQuestionIndex + 1}
            id={currentQuestionIndex}
            lastQuestion={currentQuestionIndex + 1 === totalQuestion}
            onNextQuestion={() => handleNextQuestion()}
            onQuizFinished={() => handleQuizFinished()}
            question={questions[currentQuestionIndex]?.question}
            totalQuestion={totalQuestion}
            correctAnswer={answers[questions[currentQuestionIndex]?.answer - 1]}
            hints={answerHints}
          />
        ) : (
          <>
            <Header text={`You are progressing on well ${profile?.firstname}`} />

            <div className="p-6 py-8 rounded-lg bg-shade-light w-full flex flex-col items-center gap-10 flex-1 mb-10">
              <h2 className="font-bold text-center text-2xl my-6">Revision outcome</h2>

              <div className="flex flex-wrap flex-[2] items-center gap-8 w-2/3 justify-evenly">
                <div className="flex flex-col items-center gap-4 ">
                  <p className="text-6xl font-black text-alerts-info">{correctlyAnswered}</p>
                  <p className="font-normal">Correctly answered</p>
                </div>
                <div className="flex flex-col items-center gap-4 ">
                  <p className="text-6xl font-black text-alerts-warning">
                    {totalQuestion - correctlyAnswered}
                  </p>
                  <p className="font-normal">Wrongly answered</p>
                </div>
                <div className="flex flex-col items-center gap-4 ">
                  <p className="text-6xl font-black text-alerts-success">
                    {Math.round((correctlyAnswered / totalQuestion) * 100 * 10) / 10}%
                  </p>
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

  // let { data: questions } = await getOpenEndedRevisionQuestions(cookies.token, topic_id);
  let { data: questions } = await getRevisionQuestions(cookies.token, topic_id, subject_id);

  if (questions.length === 0) {
    return {
      redirect: {
        destination: "/revision",
        permanent: false,
      },
    };
  }

  questions = _.shuffle(questions).slice(0, 50); //selects 50 random questions

  return {
    props: { questions },
  };
};