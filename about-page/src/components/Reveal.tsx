import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

type Props = {
  children: ReactNode;
  delay?: 100 | 200 | 300 | 400 | 500;
  as?: "div" | "section" | "p" | "h1" | "h2" | "h3" | "span";
  className?: string;
  style?: CSSProperties;
};

const DELAY_CLASS: Record<NonNullable<Props["delay"]>, string> = {
  100: "delay-100",
  200: "delay-200",
  300: "delay-300",
  400: "delay-400",
  500: "delay-500",
};

export default function Reveal({
  children,
  delay,
  as = "div",
  className = "",
  style,
}: Props) {
  const ref = useReveal<HTMLDivElement>();
  const Tag = as as "div";
  const delayClass = delay ? ` ${DELAY_CLASS[delay]}` : "";
  return (
    <Tag ref={ref as never} className={`fade-up${delayClass} ${className}`} style={style}>
      {children}
    </Tag>
  );
}
