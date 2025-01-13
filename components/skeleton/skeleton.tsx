import { twMerge } from "tailwind-merge";

// types
import type { SkeletonTypes } from "./types";

function Skeleton({ className }: SkeletonTypes) {
  return (
    <div className="animate-pulse w-full">
      <div className={twMerge("w-full bg-zinc-700 rounded-lg", className)} />
    </div>
  );
}

export default Skeleton;
