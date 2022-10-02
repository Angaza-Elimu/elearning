import {api} from "../../api/recommendation_base";

export default async function handler(req, res) 
{
  return api.post("/retrieve_diagnostic_questions",
     { topic_id: req.body.topic_id },
     {
       headers: {
         "Access-Control-Allow-Origin": "origin",
         "Access-Control-Allow-Credentials": true
       }
     }
   );
}