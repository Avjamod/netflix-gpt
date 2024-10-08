import React, { useEffect, useRef } from "react";
import lang from "../utils/langaugeConstants";
import { useDispatch, useSelector } from "react-redux";
// import openai from "../utils/openai";
import {
  API_KEY,
  OPTIONS_API,
  SEARCH_SUGGESTION_API,
} from "../utils/constants";
import { addgptMovieResult } from "../utils/gptSlice";
import safetySettings from "../utils/openai";
import { useState } from "react";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const GptSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      OPTIONS_API
    );
    const json = await data.json();
    return json.results;
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => getSearchSuggestions(), 200);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [searchQuery]);

  const getSearchSuggestions = async () => {
    const data = await fetch(SEARCH_SUGGESTION_API + searchText);
    const json = await data.json();

    setSuggestions(json[1]);
    console.log(json);
  };

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);

    // const gptQuery =
    //   "Act as movie recommnedation system and suggest some movies for the query: " +
    //   searchText.current.value +
    //   ". only give me name of 7 movies, comma seperated like example result given ahead. example result : Gadar, sholay, don, golmall, kai mil gya";
    // const gptResults = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: gptQuery }],
    //   model: "gpt-3.5-turbo",
    // });
    // console.log(gptResults);
    // Make sure to include these imports:
    // import { GoogleGenerativeAI } from "@google/generative-ai";
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      safetySettings: safetySettings,
    });

    const prompt =
      "Act as movie recommnedation system and suggest some movies for the query: " +
      searchText.current.value +
      ". only give me name of 5 movies , comma seperated like example result given ahead and sort them according to popularity. example result : Gadar, sholay, don, golmall, kai mil gya. Just give me like example result please don't write anything else.And if query is empty then write a statement to write something.";

    const result = await model.generateContent(prompt);

    const gptMovies = result?.response?.text().split(", ");

    console.log(gptMovies);
    const PromiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(PromiseArray);

    console.log(tmdbResults);

    dispatch(
      addgptMovieResult({ movieNames: gptMovies, moviesData: tmdbResults })
    );
  };
  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black m-2 p-2 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          value={searchQuery}
          className="col-span-9 px-2"
          placeholder={lang[langKey].gptSearchPlaceHolder}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => {
            // Delay hiding suggestions to allow the click to register
            setTimeout(() => {
              setShowSuggestions(false);
            }, 200);
          }}
        />
        <button
          className="bg-red-600 p-2 ml-4 col-span-3 text-white rounded-md"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
        <div className=" col-span-9 text-white">
          <ul className="">
            {showSuggestions &&
              suggestions.map((s) => (
                <li
                  className="px-1 m-1 hover:bg-slate-100 cursor-pointer"
                  key={s}
                  onMouseDown={() => {
                    // onMouseDown to capture the click before input loses focus
                    setSearchQuery(s);
                    setShowSuggestions(false);
                  }}
                >
                  🔍 {s}
                </li>
              ))}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default GptSearchBar;
