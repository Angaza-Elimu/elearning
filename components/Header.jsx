export default function Header({ className = "", text }) {
  return <p className={`font-normal md:font-medium text-lg md:text-2xl ${className}`}>{text}</p>;
}
