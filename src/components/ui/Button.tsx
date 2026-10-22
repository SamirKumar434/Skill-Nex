import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

interface ButtonBaseProps {
  variant?: "primary" | "outline" | "ghost" | "purple-glow";
  size?: "sm" | "md" | "lg";
  className?: string;
  pill?: boolean;
}

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button"; href?: never };

type ButtonAsAnchor = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a"; href: string };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button({
  variant = "primary",
  size = "md",
  pill = true,
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6] select-none cursor-pointer";

  const variants = {
    primary:
      "bg-[#8B5CF6] text-white hover:bg-[#7C3AED] active:scale-[0.98] border border-[#A855F7]/40 shadow-[0_0_24px_rgba(139,92,246,0.45)]",
    "purple-glow":
      "bg-[#8B5CF6] text-white hover:bg-[#7C3AED] active:scale-[0.98] border border-purple-400/50 shadow-[0_0_35px_rgba(139,92,246,0.6)]",
    outline:
      "border border-[#2D2744] text-[#F8FAFC] hover:border-[#8B5CF6] hover:text-[#C084FC] hover:bg-[#8B5CF6]/10 bg-[#0E0C16]/80 backdrop-blur-sm active:scale-[0.98]",
    ghost:
      "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#151222] bg-transparent active:scale-[0.98]",
  };

  const sizes = {
    sm: "text-xs px-3.5 py-1.5",
    md: "text-sm px-5 py-2.5",
    lg: "text-base px-7 py-3.5",
  };

  const radius = pill ? "rounded-full" : "rounded-xl";

  const classes = cn(base, radius, variants[variant], sizes[size], className);

  if (props.as === "a") {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { as: _a, variant: _v, size: _s, pill: _p, ...rest } = props as ButtonAsAnchor & {
      variant?: string;
      size?: string;
      pill?: boolean;
    };
    return <a className={classes} {...rest} />;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { as: _a2, variant: _v2, size: _s2, pill: _p2, ...rest } = props as ButtonAsButton & {
    variant?: string;
    size?: string;
    pill?: boolean;
  };
  return <button className={classes} {...rest} />;
}

