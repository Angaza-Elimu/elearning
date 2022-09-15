//getTopics

import api from "./base";

const getTopics = (class_id, subject_id, token) =>
  api.post(
    "/getTopics",
    { class: class_id, subject_id },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

export { getTopics };
