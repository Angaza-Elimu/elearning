import {api} from "./recommendation_base";

const getDiagnosticsRecommendationApi = async (data) => api.post(
    "/retrieve_diagnostic_recommendation",
    { ...data },
  );
  

export { getDiagnosticsRecommendationApi };