import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#334E31] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer active:scale-98",
  {
    variants: {
      variant: {
        default:
          "bg-[#334E31] text-white shadow-sm hover:bg-[#253A23] hover:shadow-md",
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-700",
        outline:
          "border border-[#D4E3D0] bg-transparent text-[#284824] shadow-xs hover:bg-[#EAF2E7] hover:border-[#B8D3B3]",
        secondary:
          "bg-[#E2EDE0] text-[#244220] shadow-xs hover:bg-[#D4E5D1]",
        ghost: "hover:bg-[#EAE6D8] text-[#334830]",
        link: "text-[#334E31] underline-offset-4 hover:underline",
        clay: "bg-[#EEF5EB] border border-[#D6E6D2] shadow-[0_8px_20px_rgba(40,65,42,0.06),inset_0_2px_4px_rgba(255,255,255,0.9)] text-[#264422] hover:bg-[#E2EFE0] hover:shadow-[0_12px_24px_rgba(40,65,42,0.1),inset_0_2px_4px_rgba(255,255,255,0.95)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-11 rounded-2xl px-6 text-base",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
