import { ArrowLeft, BubbleVector } from "../assets";

export default function LearnCard({
  onClick,
  title,
  subtitle,
  hasNoIcon = false,
  footerText = "learning",
  isPercentage = true,
}) {
  return (
    <div
      className={`px-8 py-10 pb-5 bg-shade-light rounded-xl hover:shadow-lg hover:scale-105 transition-all ease-in-out duration-75 h-fit cursor-pointer relative select-none ${
        hasNoIcon ? "py-5" : "py-10"
      }`}
      onClick={onClick}
    >
      <div className="absolute right-2 top-1 flex items-end justify-start w-2/5 h-2/5">
        {!hasNoIcon && (
          <>
            <BubbleVector className="absolute right-1 top-2 w-full" />
            <p className="absolute right-10 left-11 lg:left-3 capitalize text-5xl z-10 pl-6 pb-2 text-secondary-600">
              {title[0]}
            </p>
          </>
        )}
      </div>
      <div className="flex gap-5 flex-col border-b-[0.1px] border-neutral-700 pb-4 z-20">
        <p className="font-semibold text-xl w-3/4">{title}</p>
        <p className="text-neutral-500">{isPercentage ? `${subtitle}%` : "Ques. 0/100"}</p>
      </div>

      <div className="mt-3 text-primary-700 font-semibold text-lg font-openSans flex gap-2.5 items-center pl-3">
        <p>Start {footerText}</p>
        <div>
          <ArrowLeft className="stroke-2 stroke-current w-7" />
        </div>
      </div>
    </div>
  );
}
