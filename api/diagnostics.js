import {api} from "./recommendation_base";

const getDiagnosticsQuestionsApi = async (token, topic_id) => api.post(
    "/retrieve_diagnostic_questions",
    { topic_id },
  );
  

export { getDiagnosticsQuestionsApi };