import { useEffect, useState } from "react";
import { Breadcomb, Layout, QuizCard } from "../../../components";
import { getSupplementryQuizQuestions, answerQuiz } from "../../../api/supplementryQuizQuestions";
import { validToken } from "../../../api/auth";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { setScore } from "../../../store/features/quizSlice";
import { v4 as uuidv4 } from "uuid";

export default function SupplementaryQuizPage({ questions, token, subtopic_id, totalQuestion, quiz_id, subject_id }) {
    const profile = useSelector((state) => state.profile.profile)
    const router = useRouter();
    const dispatch = useDispatch();
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const options = { 1: "option_a", 2: "option_b", 3: "option_c", 4: "option_d" };
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [wrongAnswer, setWrongAnswer] = useState(0);

    const updateScore = (selectedAnswer) => {
        console.log(selectedAnswer);
        const isCorrect =
            parseInt(selectedAnswer) === parseInt(questions[currentQuestion].answer);
        if (isCorrect) {
        let score = totalScore + 1;
            setTotalScore(score);
            setCorrectAnswer(correctAnswer + 1);
        } else {
            setWrongAnswer(wrongAnswer + 1);
        }

        const payload = {
            subtopic_id,
            subject_id,
            student_id: profile.id,
            type: "question_answers",
            answer: selectedAnswer,
            marked: isCorrect ? 1 : 0,
            question_id: questions[currentQuestion].id,
            quiz_id,
            token: token
        }

        answerQuiz(payload)
    }

    const handleNext = () => {
        setCurrentQuestion((prev) => (prev < totalQuestion ? prev + 1 : prev));
    };

    const handleFinish = () => {
        const total = (correctAnswer / totalQuestion) * 100;
        const payload = {
        correctAnswer,
        wrongAnswer,
        totalScore: total.toFixed(),
        };
        dispatch(setScore(payload));
        setIsQuizFinished(true);
        if (total > 50) {
        return router.push("/40");
        }
        return router.push("/42");
    };

    useEffect(() => {
        !validToken() ? router.push("/") : setLoading(false);
    }, []);

    if (loading) return null;

    return (
        <Layout title={`Quiz`}>
        <>
            <Breadcomb />

            {questions.length > 0 && !isQuizFinished ? (
            <QuizCard
                answers={[
                `${questions[currentQuestion].option_a}`,
                `${questions[currentQuestion].option_b}`,
                `${questions[currentQuestion].option_c}`,
                `${questions[currentQuestion].option_d}`,
                ]}
                correctAnswer={`${
                questions[currentQuestion][
                    options[questions[currentQuestion].answer]
                ]
                }`}
                currentQuestion={currentQuestion}
                id={currentQuestion}
                lastQuestion={currentQuestion === totalQuestion - 1}
                onNextQuestion={handleNext}
                onQuizFinished={handleFinish}
                question={questions[currentQuestion].question}
                totalQuestion={totalQuestion}
                additional_notes={questions[currentQuestion].additional_notes}
                answer_no={questions[currentQuestion].answer}
                updateScore={updateScore}
                type="quiz"
            />
            ) : (
            <></>
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

  let { status, data: questions } = await getSupplementryQuizQuestions(
    cookies.token,
    params.subtopic_id,
    "quizq_questions"
  );

  if (status !== 200) questions = [];

  if (questions?.length > 0) {
    questions = _.shuffle(questions).slice(0, 50);
  }
  return {
    props: {
        token: cookies.token,
        quiz_id: uuidv4(),
        subject_id: cookies.subject_id,
        questions,
        subtopic_id: params.subtopic_id,
        topic_id: cookies.topic_id,
        totalQuestion: questions?.length
    },
  };
};
