import api from "./base";

const authorization = (token) => "Bearer " + token;

const user = (token) =>
  api.get("/user", {
    headers: {
      Authorization: authorization(token),
    },
  });

const updateData = ({ phone_number }, token) =>
  api.post(
    "/updateData",
    { phone_number },
    {
      headers: {
        Authorization: authorization(token),
      },
    }
  );

export { user, updateData };
