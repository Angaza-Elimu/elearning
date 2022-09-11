import api from "./base";

const getClassesApi = (token) =>
  api.get("/getClasses", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export { getClassesApi };
