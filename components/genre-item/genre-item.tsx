// types
import type { GenreItemTypes } from "./types";

function GenreItem({ genre }: GenreItemTypes) {
  return (
    <span className="p-2 px-4 bg-purple-200 border-[1px] border-purple-600 rounded-full text-purple-600 text-sm font-semibold">
      {genre.name} {/* Display the name of the genre */}
    </span>
  );
}

export default GenreItem;
