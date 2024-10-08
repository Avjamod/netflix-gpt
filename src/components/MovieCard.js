import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  return (
    posterPath && (
      <div className="flex-shrink-0">
        <img
          className="w-40 pr-3"
          alt="moviecard"
          src={IMG_CDN_URL + posterPath}
        />
      </div>
    )
  );
};

export default MovieCard;
