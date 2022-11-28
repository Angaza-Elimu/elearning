import { useEffect, useState } from "react";
import Image from "next/image";
import teamSuccessImage from "../../../../public/images/teamSuccess.svg";
import { useRouter } from "next/router";
import { Breadcomb, Button, Layout, QuizCard } from "../../../../components";
import { getDiagnosticsQuestionsApi } from "../../../../api/diagnostics";
import { validToken } from "../../../../api/auth";
import Recommendation from "../../../../components/Recommendation";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { getSubtopics } from "../../../../api/subtopics";
import { setSubtopics } from "../../../../store/features/subtopicsSlice";
import BreadcombLearn from "../../../../components/BreadcombLearn";

export default function QuizPage({ diagnostic_questions, topic_id, totalQuestion, subtopics, level="initial" }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [payload, setPayload] = useState(null);
  const [answers, setAnswers] = useState([]);
  const options = { 1: "option_a", 2: "option_b", 3: "option_c", 4: "option_d" };

  let quizLevel = level;

  const handleNext = (selectedAnswer) => {
    const isCorrect =
      parseInt(selectedAnswer) === parseInt(diagnostic_questions[currentQuestion].answer);
    if (isCorrect) {
      let score = totalScore + 1;
      setTotalScore(score);
    }
    const newQuestion = {
      id: diagnostic_questions[currentQuestion].id,
      subtopic_id: diagnostic_questions[currentQuestion].subtopic_id,
      subject_id: diagnostic_questions[currentQuestion].subject_id,
      created_at: diagnostic_questions[currentQuestion].created_at,
      question_level: diagnostic_questions[currentQuestion].question_level,
      marked: isCorrect ? 1 : 0,
    };
    setAnswers((previous) => [...previous, newQuestion]);
    setCurrentQuestion((prev) => (prev < totalQuestion ? prev + 1 : prev));
  };

  const handleFinish = () => {
    if(quizLevel === 'high_level') {
      quizLevel = 'completed_diagnostics';
    }
    const payload = {
      topic_id,
      total_score: totalScore,
      answers,
    };
    setPayload(payload);
    setIsQuizFinished(true);
  };

  useEffect(() => {
    !validToken() ? router.push("/") : setLoading(false);
    setAnswers([])
    setCurrentQuestion(0)
  }, []);

  useEffect(() => {
    dispatch(setSubtopics(subtopics));
  }, [subtopics]);

  if (loading) return null;

  const Welcome = () => {
    if (totalQuestion < 1) router.push(`/learn/topics/${topic_id}`);
      const message = (level === 'initial') ? `Let's evaluate your topic mastery, so that we can provide you with the best materials for learning`
      : (level === 'high_level') ? `Let's take the evaluation one step futher,  so that we can provide you with the best materials for learning`
      : "You are a Genius!!!"

    return (
      <>
        <BreadcombLearn />
        <div className="max-w-7xl mx-auto my-auto flex flex-1 h-full">
          <div className="flex flex-col flex-wrap flex-1 justify-around">
            <div className="relative h-48">
              <Image src={teamSuccessImage} alt="" layout="fill" />
            </div>

            <div className="flex flex-col w-full md:w-1/2 mx-auto text-center">
              <div>
                <h2 className="font-bold text-2xl">Wonderful.</h2>
                <p className="text-left text-lg mt-2">{message}</p>
              </div>

              <Button
                className="md:w-1/3 mt-5 mx-auto"
                name="Start Quiz"
                disabled={diagnostic_questions && diagnostic_questions.length < 1}
                onClick={setIsQuizStarted}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  if (isQuizFinished ) return <Recommendation payload={payload} topic_id={topic_id} level = {quizLevel}/>;

  return (
    <Layout title={`Quiz`}>
      <>
      
        {diagnostic_questions && diagnostic_questions.length > 0 && isQuizStarted && !isQuizFinished ? (
          <>
           <Breadcomb />
            <QuizCard
              answers={[
                `${diagnostic_questions[currentQuestion].option_a}`,
                `${diagnostic_questions[currentQuestion].option_b}`,
                `${diagnostic_questions[currentQuestion].option_c}`,
                `${diagnostic_questions[currentQuestion].option_d}`,
              ]}
              correctAnswer={`${
                diagnostic_questions[currentQuestion][
                  options[diagnostic_questions[currentQuestion].answer]
                ]
              }`}
              currentQuestion={currentQuestion}
              id={currentQuestion}
              lastQuestion={currentQuestion === totalQuestion - 1}
              onNextQuestion={handleNext}
              onQuizFinished={handleFinish}
              question={diagnostic_questions[currentQuestion].question}
              totalQuestion={totalQuestion}
              additional_notes={diagnostic_questions[currentQuestion].additional_notes}
              answer_no={diagnostic_questions[currentQuestion].answer}
              type="recommend"
            />
          </>
        ) : (
           
            Welcome()
        )}
      </>
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

  const [res1, res2] = await Promise.all([
    getSubtopics(cookies.topic_id, cookies.token),
    getDiagnosticsQuestionsApi(cookies.token, cookies.topic_id),
  ]);

  const [result1, result2] = await Promise.all([res1.data, res2.data]);
  const questions =  result2 ? _.shuffle(result2.questions).slice(0, 10) : [];
  return {
    props: {
      diagnostic_questions: questions,
      topic_id: cookies.topic_id,
      subtopics: result1,
      totalQuestion: questions.length,
    },
  };
};
