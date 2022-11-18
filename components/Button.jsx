import Spinner from "./Spinner";

export default function Button({
  className,
  Component,
  disabled,
  name,
  onClick,
  type = "PRIMARY",
  loading = false,
}) {
  let _className = "";

  switch (type) {
    case "PRIMARY":
      _className = `bg-primary-700 px-5 rounded-lg md:py-2 py-2 text-shade-light font-medium text-sm md:text-lg cursor-pointer transition-all ease-in-out border border-primary-700/80 active:shadow-lg  ${className} flex gap-2 items-center justify-center ${
        disabled ? " cursor-not-allowed opacity-50" : " hover:bg-primary-700/90 hover:shadow"
      } ${Component ? " flex justify-between items-center " : ""}`;
      break;

    case "SECONDARY":
      _className = `bg-[#FBFBFB] px-5 rounded-lg py-2 md:py-2 text-shade-dark font-medium text-sm md:text-lg cursor-pointer border border-primary-700/80 hover:border-primary-700 transition-all ease-in-out ${className} flex gap-2 items-center justify-center ${
        disabled
          ? " cursor-not-allowed opacity-50"
          : " hover:bg-primary-700/80 hover:shadow hover:text-shade-light"
      }  ${Component ? " flex justify-between items-center " : ""}`;
      break;

    default:
      break;
  }

  return (
    <button className={_className} disabled={disabled} onClick={onClick}>
      {loading && <Spinner />}
      {name}
      {Component && <Component />}
    </button>
  );
}
