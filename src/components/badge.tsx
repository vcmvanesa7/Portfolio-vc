import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  color?: "purple" | "blue" | "green" | "red";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  color = "purple",
  size = "md",
}) => {
  const base = "inline-block font-medium rounded-full px-2 py-1 text-white";
  const colorClass =
    color === "purple"
      ? "bg-purple-600"
      : color === "blue"
      ? "bg-blue-500"
      : color === "green"
      ? "bg-green-500"
      : "bg-red-500";

  const sizeClass = size === "sm" ? "text-xs" : "text-sm";

  return <span className={`${base} ${colorClass} ${sizeClass}`}>{children}</span>;
};
