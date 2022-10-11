import { useState } from "react";
import { AnswerRightTick, AnswerWrongTick, ChevronLeft, Info } from "../assets";
import { Button, Header } from ".";

export default function QuizCardRevision({
  answers,
  currentQuestion,
  id,
  lastQuestion,
  onNextQuestion,
  onQuizFinished,
  question,
  totalQuestion,
  correctAnswer,
  openEndedAnswers = false,
  providedAnswer,
  setProvidedAnswer,
  hints,
  selectedAnswer,
  setSelectedAnswer,
  quizName = "",
  additionalNotes,
}) {
  const options = ["A", "B", "C", "D", "E", "F", "G", "H"]; //answer options
  // const [selectedAnswer, setSelectedAnswer] = useState("");
  // const [providedAnswer, setProvidedAnswer] = useState("");
  const [showHint, setShowHint] = useState(null);

  return (
    <>
      <Header text={`${quizName ? quizName + " quiz" : "Quiz"}`} />

      <div className="max-w-6xl mr-auto w-full h-full flex-1 select-none flex flex-col">
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

        <div className="rounded-lg py-5 md:px-10 relative w-full flex flex-col flex-1 gap-2">
          {/* Question */}
          <div className="my-5">
            <div
              className="font-semibold text-xl prose-md prose-p:font-normal"
              dangerouslySetInnerHTML={{ __html: question }}
            ></div>
          </div>

          {/* Options */}
          {!openEndedAnswers ? (
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
                      <span className="text-base font-normal">{options[index]}. </span>
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
          ) : (
            // open ended answers
            <textarea
              placeholder="Type your answer here"
              rows={3}
              className="outline-none resize-none p-3 text-lg rounded-lg shadow "
              value={providedAnswer}
              disabled={showHint}
              onChange={(e) => setProvidedAnswer(e.target.value)}
            />
          )}

          {/* answer hints */}
          {showHint && (
            <div className="mt-10 flex gap-2 scroll-auto">
              <div className="h-6 w-6 mt-0.5">
                <Info />
              </div>
              <div>
                {!openEndedAnswers && (
                  <p>Correct answer is {options[answers.indexOf(correctAnswer)]}.</p>
                )}
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      hints[answers.indexOf(correctAnswer)] === null
                        ? additionalNotes
                        : hints[answers.indexOf(correctAnswer)],
                  }}
                />
              </div>
            </div>
          )}

          {/* next button */}
          <div className="self-end mt-auto w-full md:w-auto">
            {showHint === null ? (
              <Button
                type="SECONDARY"
                name="Check answer"
                className="text-primary-700 w-full md:w-auto"
                onClick={() => setShowHint(true)}
                disabled={!selectedAnswer && !providedAnswer}
              />
            ) : (
              <Button
                disabled={!selectedAnswer && !providedAnswer}
                className="w-full md:w-auto"
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
                        setSelectedAnswer && setSelectedAnswer("");
                        setProvidedAnswer && setProvidedAnswer("");
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
