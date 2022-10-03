import Image from "next/image";
import Link from "next/link";
import Breadcomb from "./Breadcomb";
import Button from "./Button";
import { useDispatch } from "react-redux";
import Layout from "./Layout";
import teamSuccessImage from "../public/images/teamSuccess.svg";
import { useEffect, useState } from "react";
import { getDiagnosticsRecommendationApi } from "../api/recommendations";
import { setRecommendation } from "../store/features/recommendationSlice";
import Cookies from "js-cookie";

export default function Recommendation({ payload }){
    const [recommendedTopics, setRecommendedTopics] = useState(null)
    const dispatch = useDispatch();

    useEffect(() => {
      getDiagnosticsRecommendationApi(payload)
      .then(res => {
        const data = res.data.subtopics_to_read;
        const result = data.reduce((acc, curr) => {
          if(!acc[curr.id]) {
            acc[curr.id] = curr
          }
          return acc
        }, {});
        const recommendations = Object.values(result).slice(0,3);
        setRecommendedTopics(recommendations)
        dispatch(setRecommendation(recommendations))
      })
      .catch((e) => console.log(e))
    }, []);

    return (
      <Layout title="Quiz Finished">
        <Breadcomb />

        <div className="max-w-7xl mx-auto my-auto flex flex-1 h-full">
          <div className="flex flex-col flex-wrap flex-1 justify-evenly">
            <div className="relative h-48">
              <Image src={teamSuccessImage} alt="" layout="fill" />
            </div>

            <div className="flex flex-col w-full mx-auto text-center">
              <div className="flex-1 justify-self-start">
                <h2 className="font-bold text-2xl">You're doing great.</h2>
                <p className="text-center text-lg mt-2 w-2/3 mx-auto">
                  Below are three subtopics we recommend you to start learning.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 flex-wrap justify-center mt-5">
              {recommendedTopics && recommendedTopics.length > 0 && recommendedTopics.map((rt, index) => (
                <Link passHref  href={`/learn/notes/subtopic/${rt.id.toString()}`} key={index}>
                  <a onClick={() => Cookies.set("subtopic_id", rt.id.toString())}>
                    <Button
                      key={index}
                      name={rt.subtopic_name}
                      type="SECONDARY"
                      className="text-shade-dark hover:bg-primary-700/90 hover:text-shade-light border-primary-700"
                    />
                  </a>
                </Link>
              ))}
            </div>

            <div className="text-center text-lg">
              <p>
                Not interested?{" "}
                <Link  href="/learn/notes">
                  <a >
                    <span className="text-primary-700 cursor-pointer hover:underline font-semibold">
                      Choose a different subtopic
                    </span>
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
}