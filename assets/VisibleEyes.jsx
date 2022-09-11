export default function VisibleEyes({ className, onClick }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        d="M7.99999 9.33317C8.73637 9.33317 9.33332 8.73622 9.33332 7.99984C9.33332 7.26346 8.73637 6.6665 7.99999 6.6665C7.26361 6.6665 6.66666 7.26346 6.66666 7.99984C6.66666 8.73622 7.26361 9.33317 7.99999 9.33317Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6667 8.00016C12.8887 11.1115 10.6667 12.6668 8.00001 12.6668C5.33334 12.6668 3.11134 11.1115 1.33334 8.00016C3.11134 4.88883 5.33334 3.3335 8.00001 3.3335C10.6667 3.3335 12.8887 4.88883 14.6667 8.00016Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
