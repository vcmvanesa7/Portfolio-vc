import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-md text-white font-medium transition ${
        props.disabled || loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {loading ? "Sending..." : children}
    </button>
  );
};
