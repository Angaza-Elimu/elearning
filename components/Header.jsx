export default function Header({ className = "", text }) {
  return <p className={`font-semibold md:font-bold text-xl md:text-3xl ${className}`}>{text}</p>;
}
