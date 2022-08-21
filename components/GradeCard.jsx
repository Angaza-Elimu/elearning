import Link from "next/link";

export default function GradeCard({ item }) {
  return (
    <Link href="learn" passhref>
      <div className="overflow-hidden rounded-lg bg-shade-light cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-200 ease-out group">
        <p className="text-center p-5 py-7 text-7xl font-bold">{item}</p>
        <div className="bg-primary-900 group-hover:bg-primary-700 p-5 py-3">
          <p className="font-semibold text-primary-600 group-hover:text-shade-light">Choose</p>
        </div>
      </div>
    </Link>
  );
}
