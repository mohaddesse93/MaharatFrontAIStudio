import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#334E31] text-white shadow-xs hover:bg-[#253A23]",
        secondary:
          "border-[#CADCC4] bg-[#E5EEDF] text-[#2C4D27] hover:bg-[#D9E7D2]",
        destructive:
          "border-transparent bg-red-600 text-white shadow-xs hover:bg-red-700",
        outline: "text-[#3D523A] border-[#D6E2D3] bg-white/70",
        clay: "border-[#D6E6D2] bg-[#EEF5EB] text-[#284824] shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
