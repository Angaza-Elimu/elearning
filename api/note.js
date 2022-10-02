import api from "./base";

const getSubtopicNotes = (token, subtopic_id) => api.post(
    "/getSubtopicNotes",
    { subtopic_id },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  

export { getSubtopicNotes };
