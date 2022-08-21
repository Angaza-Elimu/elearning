import { useState } from "react";

export default function Input({ label = "", name, value, type = "text", onChange, ...others }) {
  const [visible, setVisible] = useState(false);
  const [_type, setType] = useState(type);

  const makeVisible = () => {
    setVisible(true);
    setType("text");
  };
  const makeInvisible = () => {
    setVisible(false);
    setType("password");
  };

  return (
    <div className="border-2 border-neutral-800 rounded-md focus-within:border-primary-700 relative outlinex my-3">
      <input
        className="block w-full appearance-none focus:outline-none bg-transparent p-3 text-base"
        id={label.toLowerCase().trim().split(" ").join("")}
        name={label.toLowerCase().trim().split(" ").join("")}
        onChange={onChange}
        onFocus={(e) =>
          _type === "password" &&
          e.currentTarget.setSelectionRange(
            e.currentTarget.value.length,
            e.currentTarget.value.length
          )
        }
        placeholder={label}
        type={_type}
        value={value}
        {...others}
      />
      <label
        htmlFor={label.toLowerCase().trim().split(" ").join("")}
        className="absolute top-2.5 left-3 duration-300 origin-0 bg-shade-light text-lg text-neutral-500 font-medium px-1 select-none"
      >
        {label}
      </label>
      {/* {type === "password" && (
        <div className="absolute right-2 top-4 cursor-pointer">
          {visible ? (
            <HiddenEyes className="stroke-neutral-500" onClick={() => makeInvisible()} />
          ) : (
            <VisibleEyes className="stroke-neutral-500" onClick={() => makeVisible()} />
          )}
        </div>
      )} */}
    </div>
  );
}
