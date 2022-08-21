export default function Close({ className }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M15 5L5 15" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 5L15 15" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
