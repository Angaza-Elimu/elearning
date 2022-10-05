import { useSelector, useDispatch } from "react-redux";

import { ChevronLeft } from "../assets";
import { Title, Sidebar } from ".";
import { setShowSidebar } from "../store/features/settingsSlice";

export default function Layout({ children, title = "" }) {
  const showSidebar = useSelector((state) => state.settings.showSidebar);
  const dispatch = useDispatch();

  return (
    <>
      <Title name={title} />

      <div className="relative">
        <div className={`h-screen flex w-full`}>
          {/* sidebar */}
          <div
            className={`bg-light transition-all ease-in-out duration-300 w-full mx-auto lg:w-[280px] absolute lg:relative  ${
              !showSidebar ? "lg:-ml-[280px]" : "lg:ml-0"
            }`}
          >
            <Sidebar onHide={() => dispatch(setShowSidebar(false))} />
          </div>

          <main
            className={`bg-neutral-900 p-5 md:px-10 flex flex-col gap-6 flex-1 overflow-y-auto md:pt-8 pb-1.5 transition-all ease-in-out duration-300 mt-12 lg:mt-0  ${
              !showSidebar ? "w-[calc(100%_-_280px)]" : "w-full"
            } `}
          >
            {children}
          </main>
        </div>

        {!showSidebar && (
          <div
            className="absolute -left-1 bottom-5 rounded-r-full cursor-pointer bg-primary-900 p-2 px-2 origin-center opacity-70 scale-90 hover:shadow-lg hover:scale-90 hover:px-3.5 transition-all duration-200 ease-linear "
            onClick={() => dispatch(setShowSidebar(true))}
          >
            <ChevronLeft className="rotate-180 stroke-primary-500 stroke-2 h-7 w-h-7" />
          </div>
        )}
      </div>
    </>
  );
}
