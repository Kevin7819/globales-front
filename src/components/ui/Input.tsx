import React from "react";
import clsx from "clsx"; 

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={clsx(
        "w-full rounded px-3 py-2 focus:outline-none appearance-none",
        className
      )}
    />
  );
};
