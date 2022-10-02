import { useEffect, useState } from "react";
import { Breadcomb, Layout } from "../../../components";
import { getDiagnosticsQuestionsApi } from "../../../api/diagnostics";
import { validToken } from "../../../api/auth";
import { getPredictedQuestionsApi } from "../../../api/predictions";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setScore } from "../../../store/features/quizSlice";
import SubtopicQuizCard from "../../../components/SubtopicQuizCard";

export default function QuizPage({ initial_question }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0)
  const [wrongAnswer, setWrongAnswer] = useState(0)
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState(initial_question)
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [showHint, setShowHint] = useState(null)
  const [lastQuestion, setLastQuestion] = useState(false)
  const options = {1: 'option_a', 2: 'option_b', 3: 'option_c', 4: 'option_d'}

  const handleNext = () => {
    setShowHint(null)
    setTotalQuestion(totalQuestion + 1)
    setQuestion(currentQuestion)
  }
  
  const handleShowHint = (selectedAnswer) => {
    setShowHint(true)
    if(parseInt(selectedAnswer) === parseInt(question.answer)) {
      setCorrectAnswer(correctAnswer + 1);
    } else {
      setWrongAnswer(wrongAnswer + 1);
    }

    const payload = {
      "question_level_code": question.question_level,
      "subtopic_id": question.subtopic_id,
      "marked": parseInt(selectedAnswer) === parseInt(question.answer) ? 1 : 0
    }

    getPredictedQuestionsApi(payload)
    .then(res => {
      const current_question = res.data.quiz_question;
      if(current_question.length > 0) {
        setCurrentQuestion(current_question[0])
      } else {
        setLastQuestion(true)
      }
    })
  }

  const handleFinish = () => {
    console.log(totalQuestion,totalQuestion);
    setShowHint(null)
    const total = (correctAnswer/totalQuestion) * 100;
    const payload = {
      correctAnswer,
      wrongAnswer,
      totalScore: total,
    }
    dispatch(setScore(payload))
    if(total > 50) {
      return router.push("/40")
    }
    return router.push("/42")
  }

  useEffect(() => {
    !validToken() ? router.push("/") : setLoading(false);
    setQuestion(initial_question)
    setTotalQuestion(initial_question === null ? 0 : 1)
  }, []);

  return (
    <Layout title={`Quiz`}>
      <>
        <Breadcomb />

        { question && question.id ? (
          <SubtopicQuizCard
            answers={[
              `${question.option_a}`,
              `${question.option_b}`,
              `${question.option_c}`,
              `${question.option_d}`,
            ]}
            correctAnswer={`${question[options[question.answer]]}`}
            lastQuestion={lastQuestion}
            onNextQuestion={handleNext}
            onQuizFinished={handleFinish}
            question={question.question}
            additional_notes={question.additional_notes}
            answer_no={question.answer}
            showHint={showHint}
            handleShowHint={handleShowHint}
          />
        ) : (
          <></>
        )}
      </>
    </Layout>
  );
}

export const getServerSideProps = async ({ req: { cookies }, params }) => {
  let { status, data: diagnostic_questions } = await getDiagnosticsQuestionsApi( cookies.token, cookies.topic_id);
  if (status !== 200) diagnostic_questions = [];
  let question = null;
  if(diagnostic_questions?.questions.length > 0) {
    const questions = diagnostic_questions.questions.filter((el)=>parseInt(el.subtopic_id) === parseInt(params.subtopic_id))
    question = questions[0] || null
  }
  return {
    props: {
      initial_question: question,
      subtopic_id: params.subtopic_id
    },
  };
};
