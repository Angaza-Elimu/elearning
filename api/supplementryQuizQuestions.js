import api from "./base";

const getSupplementryQuizQuestions = (token, subtopic_id, type="quizq_questions") =>
  api.post(
    "/getQuiz",
    { subtopic_id, type },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

const answerQuiz = (payload) => 
  api.post(
    "/answerQuestion",
    { ...payload },
    {
      headers: {
        Authorization: "Bearer " + payload.token,
      },
    }
  );

export { getSupplementryQuizQuestions, answerQuiz };