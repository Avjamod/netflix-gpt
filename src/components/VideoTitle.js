import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-56 pl-10 absolute text-white bg-gradient-to-br from-black w-screen aspect-video">
      <h1 className=" text-2xl font-bold ">{title}</h1>
      <p className="w-1/4 ">{overview}</p>
      <div className="my-4">
        <button className="p-2 px-8 m-1  bg-white text-black  hover:bg-opacity-70 rounded-md ">
          Play
        </button>
        <button className="p-2 px-8 m-1 bg-gray-500 bg-opacity-50 hover:bg-opacity-75 rounded-md">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
