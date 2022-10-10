//getTopics

import api from "./base";

const authorization = (token) => "Bearer " + token;

const getTopics = (class_id, subject_id, token) =>
  api.post(
    "/getTopics",
    { class: class_id, subject_id },
    {
      headers: {
        Authorization: authorization(token),
      },
    }
  );

const getPrimaryTopics = (subject_id, token) =>
  api.post(
    "/getPrimaryTopics",
    { subject_id },
    {
      headers: {
        Authorization: authorization(token),
      },
    }
  );

export { getTopics, getPrimaryTopics };
