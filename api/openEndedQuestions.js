import api from "./base";

const getOpenEndedRevisionQuestions = (token, topic_id) =>
  api.post(
    "/getOpenEndedRevisionQuestions",
    { topic_id, class: null },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

export { getOpenEndedRevisionQuestions };
