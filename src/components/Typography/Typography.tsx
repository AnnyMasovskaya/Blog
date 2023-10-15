import React from "react";
import clsx from "clsx";
import styles from "./Typography.module.css";

interface TypographyProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  color?: "primary" | "secondary";
  font: "inter";
  className?: string;
  centered?: boolean;
  children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({
  variant = "p",
  color = "primary",
  font = "inter",
  className,
  centered,
  children,
}) => {
  const Tag = variant;

  return (
    <Tag
      className={clsx(
        styles[variant],
        styles[color],
        { [styles.centered]: centered },
        className
      )}
    >
      {children}
    </Tag>
  );
};

export default Typography;
