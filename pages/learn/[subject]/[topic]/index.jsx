import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import teamSuccessImage from "../../../../public/images/teamSuccess.svg";

import { Breadcomb, Button, Header, Layout } from "../../../../components";
import { ChevronLeft, Close } from "../../../../assets";
import QuizCard from "../../../../components/QuizCard";

export default function QuizPage() {
  const { query } = useRouter();
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [id, setId] = useState(10);
  const totalQuestion = 15;
  // ${query.topic[0].toUpperCase() + query.topic.substring(1)}

  const Welcome = () => {
    return (
      <div className="max-w-7xl mx-auto my-auto flex flex-1 h-full">
        <div className="flex flex-col flex-wrap flex-1 justify-around">
          <div className="relative h-48">
            <Image src={teamSuccessImage} alt="" layout="fill" />
          </div>

          <div className="flex flex-col w-full md:w-1/2 mx-auto text-center">
            <h2 className="font-bold text-2xl">Wonderful.</h2>
            <p className="text-left text-lg mt-2">
              Let's evaluate your topic mastery, so that we can provide you with the best materials
              for learning
            </p>

            <Button
              className="md:w-1/3 mt-5 mx-auto"
              name="Start Quiz"
              onClick={setIsQuizStarted}
            />
          </div>
        </div>
      </div>
    );
  };

  if (isQuizFinished)
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
              <Button
                name="Rounding off"
                type="SECONDARY"
                className="text-shade-dark hover:bg-primary-700/90 hover:text-shade-light border-primary-700"
              />
              <Button
                name="Square & square root"
                type="SECONDARY"
                className="text-shade-dark hover:bg-primary-700/90 hover:text-shade-light border-primary-700"
              />
              <Button
                name="Place value & total value"
                type="SECONDARY"
                className="text-shade-dark hover:bg-primary-700/90 hover:text-shade-light border-primary-700"
              />
            </div>

            <div className="text-center text-lg">
              <p>
                Not interested?{" "}
                <span className="text-primary-700 cursor-pointer hover:underline font-semibold">
                  Choose a different subtopic
                </span>
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );

  return (
    <Layout title={`Quiz`}>
      <>
        <Breadcomb />

        {isQuizStarted && !isQuizFinished ? (
          <QuizCard
            answers={["Tens", "Hundreds", "Thousands", "Tens of thousands"]}
            currentQuestion={currentQuestion}
            id={currentQuestion}
            lastQuestion={currentQuestion === totalQuestion}
            onNextQuestion={() =>
              setCurrentQuestion((prev) => (prev < totalQuestion ? prev + 1 : prev))
            }
            onQuizFinished={() => setIsQuizFinished(true)}
            question="What is the place value of digit 6 in the number 86457?"
            totalQuestion={totalQuestion}
          />
        ) : (
          Welcome()
        )}
      </>
    </Layout>
  );
}
