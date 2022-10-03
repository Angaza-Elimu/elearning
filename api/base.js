import axios from "axios";
// import { toast } from "react-toastify";
// import Notification from "../components/Notification";
// import { server } from "../config/server";

const server = "https://staging.angazaelimu.com/api";

export const api = axios.create({
  baseURL: server,
  validateStatus: false,
});

api.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response && error.response.status >= 400 && error.response.status < 500;

  if (!expectedError) {
    // toast(<Notification message="An unexpected server error occurred." type="danger" />);
    console.log("An unexpected server error occured.");
  }

  return Promise.reject(error.response);
});

export default {
  get: api.get,
  post: api.post,
  delete: api.delete,
};
