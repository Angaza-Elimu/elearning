import api from "./base";

const getRevisionQuestions = (token, topic_id, subject_id) =>
  api.post(
    "/getRevisionQuestions",
    { topic_id, class: null, subject_id },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

const answerRevisionQuestion = (token, data) =>
  api.post(
    "/answerRevisionQuestion",
    { ...data, type: "question_answers" },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

export { getRevisionQuestions, answerRevisionQuestion };
