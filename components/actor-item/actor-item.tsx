// components
import Image from "next/image";

// external components
import { FaStar } from "react-icons/fa";

// types
import type { ActorItemTypes } from "./types";

function ActorItem({ actor }: ActorItemTypes) {
  const defaultAvatar =
    "https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg";

  return (
    <div className="flex flex-col md:flex-row items-center gap-5 border-b-2 py-3 border-b-slate-300">
      <Image
        alt={actor.name}
        className="w-20 h-20 object-cover object-center rounded-full"
        src={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
            : defaultAvatar
        }
        height={80}
        width={80}
        quality={100}
        onError={(e) => {
          e.currentTarget.src = defaultAvatar;
        }}
      />

      <div className="flex-1 flex flex-col items-center md:items-start gap-2">
        <h2 className="text-lg font-bold text-white">{actor.name}</h2>
        <p className="text-base text-slate-300">{actor.character}</p>
      </div>
      <div className="flex flex-row items-center gap-2">
        <FaStar className="h-5 w-5 text-yellow-300" />
        <span className="text-sm font-bold text-white">
          {Math.ceil(actor.popularity)}
        </span>
      </div>
    </div>
  );
}

export default ActorItem;
