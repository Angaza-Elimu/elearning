import api from "./base";

const authorization = (token) => "Bearer " + token;

const user = (token) =>
  api.get("/user", {
    headers: {
      Authorization: authorization(token),
    },
  });

export { user };
