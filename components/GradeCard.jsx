import Link from "next/link";
import { useDispatch } from "react-redux";
import { setGrade } from "../store/features/gradeSlice";

export default function GradeCard({ item }) {
  const dispatch = useDispatch();

  return (
    <Link href="learn">
      <div
        className="overflow-hidden rounded-lg bg-shade-light cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-200 ease-out group"
        onClick={() => dispatch(setGrade(item))}
      >
        <p className="text-center p-5 py-7 text-3xl font-bold">{item}</p>
        <div className="bg-primary-900 group-hover:bg-primary-700 p-5 py-3">
          <p className="font-semibold text-primary-600 group-hover:text-shade-light">Choose</p>
        </div>
      </div>
    </Link>
  );
}
