import { useState } from "react";
import { ChevronLeft, Close } from "../assets";
import Button from "./Button";
import Header from "./Header";

export default function QuizCard({
  answers,
  currentQuestion,
  id,
  lastQuestion,
  onNextQuestion,
  onQuizFinished,
  question,
  totalQuestion,
}) {
  const options = ["A", "B", "C", "D", "E", "F", "G", "H"]; //answer options
  const [selectedAnswer, setSelectedAnswer] = useState("");

  return (
    <>
      <Header text="Shhhh, quiz in progress" />

      <div className="max-w-6xl mr-auto w-full h-full flex-1">
        <div className="bg-shade-light rounded-lg py-5 px-10 relative w-full h-5/6 flex flex-col">
          <div className="absolute top-5 right-5 h-6 w-6">
            <Close className="stroke-2 stroke-neutral-500 cursor-pointer hover:stroke-primary-500" />
          </div>

          <h2 className="text-accent-500 font-bold text-2xl my-4">
            Quiz {currentQuestion}/{totalQuestion}
          </h2>

          {/* Question */}
          <div className="my-5">
            <p className="font-semibold text-xl">{question}</p>
          </div>

          {/* Options */}
          <div className="flex gap-5 flex-col text-xl">
            {answers.map((answer, index) => (
              <div className="flex space-x-4 items-center">
                <input
                  checked={selectedAnswer === answer}
                  className="inline-block text-neutral-500 rounded-full w-5 h-5"
                  id={`question-${id}_option-${index + 1}`}
                  name={`question-${id}`}
                  onChange={(e) => {
                    setSelectedAnswer(e.target.value);
                  }}
                  type="radio"
                  value={answer}
                />
                <span className="inline-block text-neutral-500">
                  <label htmlFor={`question-${id}_option-${index + 1}`}>
                    <span className="font-bold">{options[index]}.</span> {answer}
                  </label>
                </span>
              </div>
            ))}
          </div>

          {/* next button */}
          <div className="self-end mt-auto">
            <Button
              disabled={!selectedAnswer}
              Component={
                !lastQuestion
                  ? () => (
                      <ChevronLeft className="stroke-shade-light rotate-180 stroke-[2.5px] h-5 w-5 ml-2" />
                    )
                  : () => null
              }
              name={lastQuestion ? "Finish quiz" : "Next"}
              onClick={
                !lastQuestion
                  ? () => {
                      setSelectedAnswer("");
                      onNextQuestion();
                    }
                  : () => onQuizFinished()
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
