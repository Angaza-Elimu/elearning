export default function Button({
  className,
  Component,
  disabled,
  name,
  onClick,
  type = "PRIMARY",
}) {
  let _className = "";

  switch (type) {
    case "PRIMARY":
      _className = `bg-primary-700/80 px-5 rounded-lg py-3 text-shade-light font-medium text-lg cursor-pointer transition-all ease-in-out border border-primary-700/80  ${className} ${
        disabled ? " cursor-not-allowed opacity-50" : " hover:bg-primary-700 hover:shadow"
      } ${Component ? " flex justify-between items-center " : ""}`;
      break;

    case "SECONDARY":
      _className = `bg-[#FBFBFB] px-5 rounded-lg py-3 text-primary-700 font-medium text-lg cursor-pointer border border-neutral-800 hover:border-primary-700 transition-all ease-in-out ${className} ${
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
      {name}
      {Component && <Component />}
    </button>
  );
}
