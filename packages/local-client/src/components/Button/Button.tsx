import React from "react";

interface ButtonProps {
  onClick: () => void;
  additionalStyles?: string;
}

export const Button: React.FC<ButtonProps> = ({
  additionalStyles,
  children,
  onClick,
}) => {
  return (
    <button
      className={additionalStyles}
      onClick={onClick}
    >
      {children}
    </button>
  );
};