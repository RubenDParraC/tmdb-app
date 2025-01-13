import { twMerge } from "tailwind-merge";

// types
import type { SkeletonTypes } from "./types";

// Skeleton component to display a loading state with a pulsing animation
// The component accepts a className prop to customize the styling of the skeleton
function Skeleton({ className }: SkeletonTypes) {
  return (
    <div className="animate-pulse w-full">
      <div className={twMerge("w-full bg-zinc-700 rounded-lg", className)} />
    </div>
  );
}

export default Skeleton;
