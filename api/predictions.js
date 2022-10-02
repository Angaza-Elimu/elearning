import api from "./prediction_base";
import Cookies from "js-cookie";

const getPredictedQuestionsApi = (data) =>
  api.post("/predict_v2", 
    { ...data },
    {
      headers: {
        Authorization: "Bearer " + Cookies.get('token'),
      },
    }
  );

export { getPredictedQuestionsApi };