export default function Header({ className = "", text }) {
  return <p className={`font-bold text-3xl ${className}`}>{text}</p>;
}
