export default function HiddenEyes({ className, onClick }) {
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
      <path d="M2 2L14 14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M7.05601 7.05811C6.80582 7.30812 6.66519 7.64727 6.66507 8.00097C6.66494 8.35466 6.80533 8.69392 7.05534 8.94411C7.30535 9.19429 7.64451 9.33492 7.9982 9.33504C8.3519 9.33517 8.69115 9.19478 8.94134 8.94477"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.24201 3.57687C6.81362 3.41335 7.40547 3.33143 8.00001 3.33354C10.6667 3.33354 12.8887 4.88887 14.6667 8.0002C14.148 8.90754 13.592 9.68287 12.998 10.3255M11.5713 11.5662C10.484 12.2995 9.29468 12.6669 8.00001 12.6669C5.33334 12.6669 3.11134 11.1115 1.33334 8.0002C2.24601 6.40354 3.27534 5.21687 4.42134 4.43954"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
