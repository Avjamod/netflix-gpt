import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGE, USER_LOGO } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import lang from "../utils/langaugeConstants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const langKey = useSelector((store) => store.config.lang);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  const handleGptSearch = () => {
    dispatch(toggleGptSearchView());
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLangauges = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute bg-gradient-to-b from-black p-1 z-10 flex items-center justify-around w-full">
      <img className="w-40 " src={LOGO} alt="Logo" />
      <select
        className="p-2 mr-2 bg-gray-700 text-white rounded-md "
        onChange={handleLangauges}
      >
        {SUPPORTED_LANGUAGE.map((lang) => (
          <option key={lang.identifier} value={lang.identifier}>
            {lang.name}
          </option>
        ))}
      </select>

      <div className="flex items-center">
        {user && (
          <div className="flex">
            <button
              className="p-2 mr-3 bg-purple-600 hover:bg-purple-700 rounded-md text-white"
              onClick={handleGptSearch}
            >
              {showGptSearch ? "HomePage" : lang[langKey].gptSearch}
            </button>
            <p className="text-white font-bold p-1 m-2">
              {lang[langKey].welcome + " " + user?.displayName}
            </p>
            <img className="w-12 rounded-lg" src={USER_LOGO} />
            <button
              className="bg-red-600 hover:bg-red-700 p-1 m-2 text-white rounded-md"
              onClick={handleSignOut}
            >
              {lang[langKey].signout}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
