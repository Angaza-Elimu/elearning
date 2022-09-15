import api from "./base";

const getSubjectsApi = (token) =>
  api.get("/getSubjects", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export { getSubjectsApi };
