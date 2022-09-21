import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import teamSuccessImage from "../../../../public/images/teamSuccess.svg";

import { Breadcomb, Button, Layout, QuizCard } from "../../../../components";
import Link from "next/link";

export default function QuizPage() {
  const { query } = useRouter();
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [id, setId] = useState(10);
  const totalQuestion = 2;
  // ${query.topic[0].toUpperCase() + query.topic.substring(1)}

  const recommendedTopics = [
    { id: 1, name: "Rounding off", done: false },
    { id: 2, name: "Square & square root", done: false },
    { id: 3, name: "Place value & total value", done: false },
  ];

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
              {recommendedTopics.map((rt) => (
                <Link passHref href={`/learn/notes/${rt.id.toString()}`}>
                  <Button
                    key={rt.id.toString()}
                    name={rt.name}
                    type="SECONDARY"
                    className="text-shade-dark hover:bg-primary-700/90 hover:text-shade-light border-primary-700"
                  />
                </Link>
              ))}
            </div>

            <div className="text-center text-lg">
              <p>
                Not interested?{" "}
                <Link passHref href="/learn/notes">
                  <a>
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

  return (
    <Layout title={`Quiz`}>
      <>
        <Breadcomb />

        {isQuizStarted && !isQuizFinished ? (
          <QuizCard
            answers={[
              `<figure class="image"><img src="https://staging.angazaelimu.com/userfiles/24c1f0e396d07602c8da43ba7bd20f72a50c8bf7.png"></figure>`,
              `<figure class="image"><img src="https://staging.angazaelimu.com/userfiles/309cad8778e21ed1f3a54849aba288b117ec9cf6.png"></figure>`,
              `<figure class="image"><img src="https://staging.angazaelimu.com/userfiles/2da9de34a5c6a875f1b1cb30f1a747f96edc554a.png"></figure>`,
              `<figure class="image"><img src="https://staging.angazaelimu.com/userfiles/85676fc9db73a8b7f0fae98a04b1a17d7dc9eb3f.png"></figure>`,
            ]}
            correctAnswer={`<figure class="image"><img src="https://staging.angazaelimu.com/userfiles/85676fc9db73a8b7f0fae98a04b1a17d7dc9eb3f.png"></figure>`}
            currentQuestion={currentQuestion}
            id={currentQuestion}
            lastQuestion={currentQuestion === totalQuestion}
            onNextQuestion={() =>
              setCurrentQuestion((prev) => (prev < totalQuestion ? prev + 1 : prev))
            }
            onQuizFinished={() => setIsQuizFinished(true)}
            // question="What is the place value of digit 6 in the number 86457?"
            question={`
            <p>What is the answer to the below?<p/>
            <figure class="image">
              <img src="https://staging.angazaelimu.com/userfiles/a9bce49d60f006e5012301dd9f5b34ac12c15052.png" alt='' />
            </figure>
            `}
            totalQuestion={totalQuestion}
          />
        ) : (
          Welcome()
        )}
      </>
    </Layout>
  );
}

export const getServerSideProps = async ({ req, params }) => {
  console.log(params);
  return {
    props: {},
  };
};
