import { useState } from "react";
import { AnswerRightTick, AnswerWrongTick, ChevronLeft, Info } from "../assets";
import { Button, Header } from "./";

export default function QuizCard({
  answers,
  currentQuestion,
  id,
  lastQuestion,
  onNextQuestion,
  onQuizFinished,
  question,
  totalQuestion,
  correctAnswer,
}) {
  const options = ["A", "B", "C", "D", "E", "F", "G", "H"]; //answer options
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showHint, setShowHint] = useState(null);

  return (
    <>
      <Header text={`${"Number"} quiz`} />

      <div className="max-w-6xl mr-auto w-full h-full flex-1 select-none">
        <div className="">
          <div className="bg-neutral-800 h-1.5 rounded-md">
            <div
              className="h-1.5 rounded-md bg-accent-600 transition-all duration-500 ease-linear"
              style={{ width: `${(currentQuestion / totalQuestion) * 100}%` }}
            />
          </div>
          <p className="mt-1 text-neutral-500 font-medium text-sm">
            <span className="text-lg font-semibold text-accent-600">{currentQuestion}</span>/
            {totalQuestion}
          </p>
        </div>

        <div className="rounded-lg py-5 px-10 relative w-full h-5/6 flex flex-col">
          {/* Question */}
          <div className="my-5">
            <div
              className="font-semibold text-xl"
              dangerouslySetInnerHTML={{ __html: question }}
            ></div>
          </div>

          {/* Options */}
          <div className="flex gap-2 flex-col text-xl">
            {answers.map((answer, index) => (
              <div
                className={`flex space-x-4 items-center flex-1 bg-[#E9F2F5] rounded-md px-5 py-3 cursor-pointer ${
                  selectedAnswer === answer &&
                  "bg-alerts-info text-shade-light prose-p:text-shade-light "
                } ${
                  showHint && answer === correctAnswer && "bg-[#298029] prose-p:text-shade-light "
                } ${
                  showHint &&
                  answer === correctAnswer &&
                  selectedAnswer !== correctAnswer &&
                  "bg-[#D8F3D8] text-alerts-success prose-p:text-alerts-success "
                } ${
                  showHint &&
                  selectedAnswer === answer &&
                  correctAnswer !== selectedAnswer &&
                  "bg-alerts-danger"
                }`}
                key={index}
                onClick={() => {
                  !showHint && setSelectedAnswer(answer);
                }}
              >
                <div className="flex justify-between items-center flex-1">
                  <div className="flex gap-1 gap-x-3 items-center">
                    <span className="text-base font-semibold">{options[index]}. </span>
                    <div dangerouslySetInnerHTML={{ __html: answer }} className="prose"></div>
                  </div>
                  {showHint && correctAnswer === answer && (
                    <div className="relative h-5 w-5">
                      <AnswerRightTick
                        className={`${
                          showHint && answer === correctAnswer && correctAnswer === selectedAnswer
                            ? "stroke-shade-light"
                            : "stroke-alerts-success"
                        }`}
                      />
                    </div>
                  )}
                  {showHint && selectedAnswer === answer && correctAnswer !== selectedAnswer && (
                    <div className="relative h-5 w-5">
                      <AnswerWrongTick />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* answer hints */}
          {showHint && (
            <div className="mt-10 flex gap-2 scroll-auto">
              <div className="h-6 w-6 mt-0.5">
                <Info />
              </div>
              <div>
                <p>Correct answer is D.</p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: "Scelerisque nec ornare tortor neue. At amet volutpat.",
                  }}
                />
              </div>
            </div>
          )}

          {/* next button */}
          <div className="self-end mt-auto">
            {showHint === null ? (
              <Button
                type="SECONDARY"
                name="Check answer"
                className="text-primary-700"
                onClick={() => setShowHint(true)}
                disabled={!selectedAnswer}
              />
            ) : (
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
                        setShowHint(null);
                      }
                    : () => onQuizFinished()
                }
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
