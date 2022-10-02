//getTopics

import api from "./base";

const getSubtopics = (topic_id, token) =>
  api.post(
    "/getSubtopics",
    { topic_id },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

export { getSubtopics };
