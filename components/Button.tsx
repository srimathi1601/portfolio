import type { ReactNode } from "react";

type Props = {
  href: string;
  variant?: "accent" | "outline";
  external?: boolean;
  download?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const variants = {
  accent: "bg-accent-gradient bg-[length:200%_100%] bg-left text-on-accent hover:bg-right hover:shadow-glow",
  outline: "border border-accent/50 text-champagne hover:border-accent-light hover:text-fg hover:shadow-glow",
};

export default function Button({
  href,
  variant = "accent",
  external,
  download,
  className = "",
  children,
  onClick,
}: Props) {
  return (
    <a
      href={href}
      onClick={onClick}
      download={download || undefined}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-[background-position,box-shadow,border-color,color] duration-500 ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
