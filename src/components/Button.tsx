import React, { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "secondary" | "ghost"; // Color theme
  size?: "sm" | "md" | "lg"; // Tamaño
  icon?: ReactNode; // Icono opcional
}

export const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  variant = "primary",
  size = "md",
  icon,
  ...props
}) => {
  // Define background color based on variant
  const baseClasses = "font-medium rounded-md transition flex items-center justify-center gap-2";
  const variantClasses =
    variant === "primary"
      ? "bg-purple-600 text-white hover:bg-purple-700"
      : variant === "secondary"
      ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
      : "bg-transparent text-purple-600 hover:bg-purple-50 border border-purple-600";

  const sizeClasses =
    size === "sm"
      ? "px-3 py-1 text-sm"
      : size === "lg"
      ? "px-6 py-3 text-lg"
      : "px-4 py-2 text-md";

  const disabledClasses = (props.disabled || loading) && "bg-gray-400 cursor-not-allowed text-gray-700";

  return (
    <button
      {...props}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses}`}
    >
      {loading ? "Loading..." : <>
        {icon && icon}
        {children}
      </>}
    </button>
  );
};
