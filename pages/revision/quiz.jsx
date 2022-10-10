import _ from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import { getToken, validToken } from "../../api/auth";
// import { getOpenEndedRevisionQuestions } from "../../api/openEndedQuestions";
import { answerRevisionQuestion, getRevisionQuestions, submitRevision } from "../../api/revision";
import { getPrimaryTopics, getTopics } from "../../api/topics";
import { Button, Header, Layout, Notification, QuizCardRevision } from "../../components";

export default function QuizPage({ questions, topic, subject_id }) {
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { query, ...router } = useRouter();

  const totalQuestion = questions.length;
  const [loading, setLoading] = useState(true);
  const { profile } = useSelector((state) => state.profile);
  const { grade } = useSelector((state) => state.grade);

  const [correctlyAnswered, setCorrectlyAnswered] = useState(0);
  // const [providedAnswer, setProvidedAnswer] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [uniqueQuizId, setUniquedQuizId] = useState("");
  const [startTime, setStartTime] = useState(null);

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

  const submitQuizAnswer = async () => {
    let answered = {
      student_id: profile.id,
      topic_id: query.topic_id,
      subject_id: query.subject_id,
      answer: questions[currentQuestionIndex]?.answer,
      marked: 0,
      question_id: questions[currentQuestionIndex].id,
      quiz_id: uniqueQuizId,
    };

    if (answers.indexOf(selectedAnswer) + 1 == questions[currentQuestionIndex]?.answer) {
      setCorrectlyAnswered((prev) => prev + 1);
      answered = { ...answered, marked: 1 };
    }

    return answerRevisionQuestion(getToken(), answered);
  };

  const handleNextQuestion = async () => {
    setCurrentQuestionIndex((prev) => (prev < totalQuestion ? prev + 1 : prev));
    await submitQuizAnswer();
  };

  const handleQuizFinished = async () => {
    setIsQuizFinished(true);

    await submitQuizAnswer();

    let submit = {
      student_id: profile.id,
      class: grade.id,
      school_code: profile.school_code,
      topic_id: query.topic_id,
      subject_id: query.subject_id,
      correctly_answered: correctlyAnswered,
      wrongly_answered: totalQuestion - correctlyAnswered,
      total_questions: totalQuestion,
      quiz_id: uniqueQuizId,
      total_time: Math.round((Date.now() - startTime) / 1000),
    };

    // submit quiz
    await submitRevision(getToken(), submit);
  };

  //route protection
  useEffect(() => {
    !validToken() ? router.push("/") : setLoading(false);
  }, []);

  //initiatlization of quiz data
  useEffect(() => {
    setUniquedQuizId(uuidv4());
    setStartTime(Date.now());
  }, []);

  //no questions
  useEffect(() => {
    setLoading(true);
    if (questions.length === 0) {
      toast(<Notification type="info" message="No questions found." />);
      router.push(`/revision/subjects/${subject_id}`);
    } else {
      setLoading(false);
    }
  }, [questions]);

  return loading ? null : (
    <Layout title={`Revision Quiz`}>
      <>
        {!isQuizFinished ? (
          <QuizCardRevision
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
            quizName={topic?.topic_name}
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
                <Link passHref href={`/revision/subjects/${subject_id}`}>
                  <a className="cursor-pointer">
                    <Button name="Continue to next subtopic" />
                  </a>
                </Link>

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
  const grade = JSON.parse(JSON.parse(cookies["persist%3Aroot"]).grade)?.grade;
  let topic;

  if (!topic_id || !subject_id) {
    return {
      notFound: true,
    };
  }

  let { data: questions } = await getRevisionQuestions(cookies.token, topic_id, subject_id);

  if (questions.length === 0) {
    questions = [];
  }

  if (grade.learning_system === "secondary") {
    let { data: _topic } = await getTopics(grade.id, query.subject_id, cookies.token);
    topic = _topic;
  }

  if (grade.learning_system === "primary") {
    let {
      data: { data: _topic },
    } = await getPrimaryTopics(query.subject_id, cookies.token);
    topic = _topic;
  }

  questions = _.shuffle(questions).slice(0, 50); //selects 50 random questions
  topic = topic.find((t) => t.id.toString() === topic_id);

  return {
    props: { questions, topic, subject_id },
  };
};
